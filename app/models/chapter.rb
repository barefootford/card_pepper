class Chapter < ActiveRecord::Base
  belongs_to :deck

  has_many :cards, dependent: :destroy
  has_many :card_suggestions, dependent: :destroy
  
  validates :deck_id, presence: :true

  def user
    deck.user    
  end

  def card_suggestions_count
    card_suggestions.all.saved.count    
  end
end
