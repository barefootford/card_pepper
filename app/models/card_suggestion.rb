class CardSuggestion < ActiveRecord::Base
  enum status: { pending: 0, approved: 1, rejected: 2 }

  belongs_to :deck
  belongs_to :user

  validates :question, presence: true, length: { maximum: 140, minimum: 1 }
  validates :answer, presence: true, length: { maximum: 140, minimum: 1 }
  validates :user_id, presence: true
  validates :deck_id, presence: true

  def self.addClientSideAttributes(cs)
    client_side_only_attributes = {
      userID: cs.user.id,
      username: cs.user.name
    }

    cs.attributes.merge(client_side_only_attributes)
  end

  def self.saved
    where('id > 0')
  end

  def reject!
    self.rejected!
    self
  end

  def approve!
    self.approved!
    Card.create({
      question: self.question,
      answer: self.answer,
      deck_id: self.deck_id,
      user_id: self.user_id
    })
  end
end