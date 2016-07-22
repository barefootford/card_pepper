class Card < ActiveRecord::Base
  enum status: { active: 0, archived: 1 }

  belongs_to :deck
  belongs_to :user

  has_many :user_cards, dependent: :destroy
  has_many :versions
  has_many :card_edits, dependent: :destroy

  validates :deck_id, presence: true
  validates :user_id, presence: true

  validates :question, presence: :true, length: { maximum: 140, minimum: 1 }
  validates :answer, presence: :true, length: { maximum: 140, minimum: 1 }

  after_save :create_version

  scope :saved, -> { where('id > 0') }

  def self.addClientSideAttributes(card)
    client_side_only_attributes = {
      status: 'viewing', # options: 'viewing', 'editing', 'consideringDeleting', 'DESTROY', 'DESTROYFAILED'
      errors: [],
      questionErrors: [],
      answerErrors: [],
      flash: '', # "The card was saved successfully."
      reason: '', # we don't use this for editing cards yet, but do use it for creating CardEdits
      edited_question: card.question,
      edited_answer: card.answer,
      user_name: card.user.name
    }
    card.attributes.merge(client_side_only_attributes)
  end

  def create_version(user_id=self.user_id)
    self.versions.create(question: self.question, answer: self.answer, user_id: user_id)
  end

  def latest
    @latest ||= self.versions.last
  end
end
