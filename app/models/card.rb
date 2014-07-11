class Card < ActiveRecord::Base
  belongs_to :chapter
  validates :chapter_id, presence: :true
end