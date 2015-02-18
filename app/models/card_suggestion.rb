class CardSuggestion < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user

  validates :question, presence: true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: true, length: { maximum: 140, minimum: 2 }
  validates :user_id, presence: true
  validates :deck_id, presence: true

  scope :unapproved, -> { where(approved: false ) }

  def self.saved
    where('id > 0 ')
  end

  def approve
    self.approved = true
    self.save
    Card.create(question: self.question, answer: self.answer, deck_id: self.deck_id)
  end
end