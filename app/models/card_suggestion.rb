class CardSuggestion < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user
  validates :chapter_id, :user_id, presence: :true
  validates :question, presence: :true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: :true, length: { maximum: 140, minimum: 2 }
end