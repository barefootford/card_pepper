class UserCard < ActiveRecord::Base
  belongs_to :deck_subscription
  belongs_to :card

  validates :deck_subscription_id, presence: true
  validates :card_id, presence: true

  def active?
    card && card.active? 
  end

  def answer
    card.answer
  end

  def increased_efficiency
    if efficiency.present? && efficiency >= 1.5
      self.efficiency + 0.1
    else
      1.7
    end
  end

  def view_count_plus_1
    if self.view_count.present?
      self.view_count + 1
    else
      1
    end
  end

  def decreased_efficiency
    if self.efficiency.present? && self.efficiency >= 1.8
      efficiency - 0.1
    else
      1.7
    end
  end

  def needs_studying?
    if active? && never_viewed?
      true
    elsif active? && (next_view < DateTime.now)
      true
    else
      false
    end
  end

  def never_viewed?
    view_count.blank?
  end

  def next_view_strftime
    if next_view.present?
      next_view.strftime('%B %-d, %Y at %l%P.')
    else
      "Card hasn't been studied yet."
    end
  end

  def now
    @now ||= DateTime.now
  end

  def question
    card.question
  end

  def ideal_next_view
    time_difference = TimeDifference.between(self.last_view, now).in_hours
    ideal_next_view = now + ((time_difference * efficiency).hours)

    if TimeDifference.between(ideal_next_view, now).in_hours < 12
      ideal_next_view = now + 12.hours
    else
      ideal_next_view
    end
  end

  def update_for_correct_response
    if self.never_viewed?
      self.update!(next_view: now + 12.hours, first_view: now, last_view: now,
        efficiency: increased_efficiency, view_count: view_count_plus_1)
    else
      self.update!(next_view: ideal_next_view, last_view: now,
        efficiency: increased_efficiency, view_count: view_count_plus_1)
    end
  end

  def update_for_incorrect_response
    if self.never_viewed?
      self.update!(efficiency: decreased_efficiency, view_count: view_count_plus_1,
        next_view: now, first_view: now, last_view: now)
    else
      self.update!(efficiency: decreased_efficiency, next_view: now, last_view: now,
         view_count: view_count_plus_1)
    end
  end

  def update_with(user_response)
    case user_response
    when 'got-it'
      update_for_correct_response
    when 'again'
      update_for_incorrect_response
    else
      Raise("UserCard#update_with unable to update. Response: #{user_response}")
    end
  end
end
