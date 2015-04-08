class StudySession < ActiveRecord::Base
  serialize :user_card_ids
  belongs_to :deck_subscription
  belongs_to :deck

  validates :deck_subscription_id, presence: true
  validates :deck_id, presence: true

  def next_card
    @next_card ||= UserCard.includes(:card).find(user_card_ids.sample)
  end

  def cards_remain?
    user_card_ids.any?
  end

  def add_user_card_ids
    deck_subscription.user_cards_to_study.each do |uc|
      self.user_card_ids.push(uc.id)
    end
  end
end
