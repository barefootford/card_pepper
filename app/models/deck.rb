require 'csv'

class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :card_suggestions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :deck_favorites, dependent: :destroy

  validates :title, length: { minimum: 5, maximum: 65 }
  validates :instructions, length: { minimum: 0, maximum: 3000 }, allow_blank: true
  validates :user_id, presence: :true

  # There has gotta be an Active Record method scope for this
  scope :saved, lambda { where('id > 0') }

  # For ActiveModel::Serialization 
  def attributes
    {
      'id' => nil,
      'updated_at' => nil,
      'title' => nil,
      'instructions' => nil,
      'user_id' => nil,
      'edit_deck_path' => nil,
      'deck_path' => nil
    }
  end

  def _instructions
    if instructions.present?
      instructions
    else
      "This deck doesn't have instructions yet."
    end
  end

  def any_card_suggestions_pending?
    card_suggestions.pending.any?
  end

  def card_count
    cards.count
  end

  def deck_path
    deck = self
    Rails.application.routes.url_helpers.deck_path(deck)
  end

  def edit_deck_path
    deck = self
    Rails.application.routes.url_helpers.edit_deck_path(deck)
  end

  def deck_path
    deck = self
    Rails.application.routes.url_helpers.deck_path(deck)
  end

  def file_name
    "#{self.title.delete(' ')}.csv"
  end

  def card_suggestions_count
    card_suggestions.count
  end

  def to_csv
    csv_string = CSV.generate do |csv|
      self.cards.each {|c| csv << [ c.question, c.answer ] }
    end
  end
end
