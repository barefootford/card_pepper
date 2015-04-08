class Card < ActiveRecord::Base
  enum status: { active: 0, archived: 1 }

  belongs_to :deck
  belongs_to :user

  has_many :user_cards
  has_many :versions

  validates :deck_id, presence: true
  validates :user_id, presence: true

  validates :question, presence: :true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: :true, length: { maximum: 140, minimum: 2 }

  after_save :create_version

  scope :saved, -> { where('id > 0') }

  def answer_preview
    '-----------------------'
  end

  def create_version(user_id=self.user_id)
    self.versions.create(question: self.question, answer: self.answer, user_id: user_id)
  end

  def latest
    @latest ||= self.versions.last
  end
end
