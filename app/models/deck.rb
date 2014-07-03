class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :chapters, dependent: :destroy

  validates :title, length: { minimum: 5 }
  validates :title, length: { maximum: 65 }
  validates :user_id, presence: :true
end