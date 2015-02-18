class Version < ActiveRecord::Base
  belongs_to :card
  belongs_to :user

  validates :user_id, presence: true
end
