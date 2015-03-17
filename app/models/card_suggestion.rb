class CardSuggestion < ActiveRecord::Base
  enum status: [:pending, :approved, :rejected]

  belongs_to :deck
  belongs_to :user

  validates :question, presence: true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: true, length: { maximum: 140, minimum: 2 }
  validates :user_id, presence: true
  validates :deck_id, presence: true

  def self.saved
    where('id > 0')
  end

  def reject!
    self.rejected!
    self
  end

  def approve!
    self.approved!
    Card.create!(question: self.question, answer: self.answer, deck_id: self.deck_id, user_id: self.user_id)
    self
  end
end