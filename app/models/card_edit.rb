class CardEdit < ActiveRecord::Base
  enum status: { pending: 0, declined: 1, approved: 2 }

  belongs_to :card
  belongs_to :user

  validates :card_id, presence: true
  validates :user_id, presence: true

  validates :question, presence: :true, length: {  minimum: 1, maximum: 140 }
  validates :answer, presence: :true, length: { minimum: 1, maximum: 140 }
  validates :editor_response, length: { maximum: 5000 }

  # For ActiveModel::Serialization 
  def attributes
    {
      'id' => nil,
      'user_id' => nil,
      'card_id' => nil,
      'question' => nil,
      'answer' => nil,
      'status' => nil,
      'editor_response' => nil,
      'reason' => nil,
      'updated_at' => nil,
      'name' => nil,
      'flash' => nil
    }
  end

  def flash
    ''
  end

  def name
    self.user.name
  end

  def reason
    self[:reason].to_s
  end

  def editor_response
    # convert nils to an empty string for client side
    self[:editor_response].to_s
  end

  def approve!
    self.approved!
    self.card.update(question: self.question, answer: self.answer)
  end

  def decline!
    self.approved!
    self.card.update(question: self.question, answer: self.answer)
  end
end