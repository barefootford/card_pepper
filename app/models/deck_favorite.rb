class DeckFavorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :deck

  validates :user_id, :deck_id, presence: true
end
