class Card < ActiveRecord::Base
  belongs_to :chapter
  validates :chapter_id, presence: :true
  validates :question, presence: :true, length: { maximum: 140, minimum: 2 }
  validates :answer, presence: :true, length: { maximum: 140, minimum: 2 }

  def user
    chapter.deck.user   
  end
end