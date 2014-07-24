class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :chapters, dependent: :destroy

  validates :title, length: { minimum: 5 }
  validates :title, length: { maximum: 65 }
  validates :user_id, presence: :true

  def card_count
    count = 0

    chapters.each do |chapter|
      count += chapter.cards.count 
    end

    count
  end
end