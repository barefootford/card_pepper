class ToDo < ActiveRecord::Base
  belongs_to :study_session
  belongs_to :user_card

  validates :user_card_id, presence: true
  validates :study_session_id, presence: true
end
