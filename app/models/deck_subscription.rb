class DeckSubscription < ActiveRecord::Base
  enum status: { active: 0, paused: 1, archived: 2 }

  belongs_to :deck
  belongs_to :user

  validates :user_id, presence: true
  validates :deck_id, presence: true
  
  default_scope { where(status: 0) }
  scope :inactive, -> { where(status: [1, 2] ) }
end