class Card < ActiveRecord::Base
  belongs_to :deck
  belongs_to :user

  has_many :versions

  validates :question, :answer, presence: :true, length: { maximum: 140, minimum: 1 }
  validates :deck_id, presence: true
  validates :user_id, presence: true

  after_save :create_version

  scope :saved, -> { where('id > 0') }

  def create_version(user_id=self.user_id)
    self.versions.create(question: self.question, answer: self.answer, user_id: user_id)
  end

  def latest
    @latest ||= self.versions.last
  end
end
