class StudySession < ActiveRecord::Base
  belongs_to :deck_subscription
  belongs_to :deck

  validates :deck_subscription_id, presence: true
  validates :deck_id, presence: true
end
