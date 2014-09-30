class CardSuggestion < ActiveRecord::Base
  belongs_to :chapter
  belongs_to :user

  validates :chapter_id, :user_id, presence: :true
  validates :question, presence: :true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: :true, length: { maximum: 140, minimum: 2 }
  validates :user_id, presence: :true

  def self.saved
    where('id > 0 ')    
  end

  def approve
    self.approved = true
    self.save
    Card.create(question: self.question, answer: self.answer, chapter_id: self.chapter_id)
  end
end