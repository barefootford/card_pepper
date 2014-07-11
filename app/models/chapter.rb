class Chapter < ActiveRecord::Base
  belongs_to :deck
  has_many :cards
  validates :deck_id, presence: :true
end
