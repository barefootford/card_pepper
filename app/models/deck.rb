require 'csv'

class Deck < ActiveRecord::Base
  belongs_to :user
  has_many :card_suggestions, dependent: :destroy
  has_many :cards, dependent: :destroy
  has_many :card_edits, through: :cards
  has_many :deck_favorites, dependent: :destroy

  validates :title, length: { minimum: 5, maximum: 65 }
  validates :instructions, length: { minimum: 0, maximum: 3000 }, allow_blank: true
  validates :user_id, presence: :true

  # There has gotta be an Active Record method scope for this
  # ...Also this might not even be necessary because we're
  # not using rails forms for decks/cards anymore
  scope :saved, lambda { where('id > 0') }

  # For ActiveModel::Serialization 
  def attributes
    {
      'id' => nil,
      'title' => nil,
      'instructions' => nil,
      'user_id' => nil,
      'edit_deck_path' => nil,
      'deck_path' => nil,
      'download_path' => nil
    }
  end

  def instructions
    if self[:instructions].blank?
      "This deck doesn't have instructions yet."
    else
      self[:instructions]
    end
  end

  def download_path
    self.deck_path + '.csv'
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
