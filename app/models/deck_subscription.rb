class DeckSubscription < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user

  validates :user_id, presence: true
  validates :deck_id, presence: true
end
