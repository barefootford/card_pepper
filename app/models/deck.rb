class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :chapters, dependent: :destroy
  has_many :card_suggestions, through: :chapters
  has_many :cards, through: :chapters

  validates :title, length: { minimum: 5, maximum: 65 }
  validates :user_id, presence: :true

  def card_count
    count = 0

    chapters.each do |chapter|
      count += chapter.cards.count 
    end

    count
  end

  def card_suggestions_count
    count = 0

    chapters.each do |chapter| 
      count += chapter.card_suggestions_count
    end 

    count
  end
end