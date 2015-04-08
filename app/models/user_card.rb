class UserCard < ActiveRecord::Base
  belongs_to :deck_subscription
  belongs_to :card

  validates :deck_subscription_id, presence: true
  validates :card_id, presence: true

  def active?
    card.active?
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

  def incremented_view_count
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

  def now
    @now ||= DateTime.now
  end

  def time_gap
    if self.last_view.present?
      time_gap = now.to_i - self.last_view.to_i
      # if gap is too small, set to 8 hours
      time_gap = 8.hours.to_i if (time_gap < 8.hours.to_i)
    else
      time_gap = 8.hours.to_i
    end
  end

  def question
    card.question
  end

  def update_for_correct_response
    if self.never_viewed?
      self.update!(next_view: now + 12.hours, first_view: now, last_view: now,
        efficiency: increased_efficiency, view_count: incremented_view_count)
    else
      self.update!(next_view: now + (time_gap.to_f * increased_efficiency.to_f), last_view: now,
        efficiency: increased_efficiency, view_count: incremented_view_count)
    end
  end

  def update_for_incorrect_response
    if self.never_viewed?
      self.update!(efficiency: decreased_efficiency, view_count: incremented_view_count,
        next_view: now, first_view: now, last_view: now)
    else
      self.update!(efficiency: decreased_efficiency, next_view: now, last_view: now,
         view_count: incremented_view_count)
    end
  end

  def update_with(user_response)
    case user_response
    when 'got-it'
      update_for_correct_response
    when 'again'
      update_for_incorrect_response
    else
      raise StandardError
    end
  end
end
