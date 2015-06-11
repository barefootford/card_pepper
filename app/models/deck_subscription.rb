class DeckSubscription < ActiveRecord::Base
  enum status: { active: 0, archived: 1}

  belongs_to :deck
  belongs_to :user

  has_many :study_sessions
  has_many :user_cards

  validates :user_id, presence: true
  validates :deck_id, presence: true

  scope :inactive, -> { where(status:1) }

  def sync
    create_user_cards
  end

  def sorted_user_cards
    @sorted ||= self.user_cards.sort_by {|uc| uc.next_view }
  end

  def needs_studying_on
    @sorted = sorted_user_cards

    if @sorted.any?
      user_card_time = @sorted.first.next_view + 1.hour
      user_card_time.strftime('%B %-d, %Y at%l%P.')
    else
      false
    end
  end

  def primary_or_disabled
    if needs_studying?
      'btn-primary'
    else
      'disabled'
    end
  end

  def user_cards_to_study
    @user_cards_to_study ||= user_cards.includes(:card).select do |uc|
      uc.needs_studying?
    end
  end

  def needs_studying?
    user_cards_to_study.any?
  end

  def create_user_cards
    deck.cards.active.each do |card|
      unless card.user_cards.where(deck_subscription_id: self.id).any?
        card.user_cards.create!(deck_subscription_id: self.id)
      end
    end
  end
end