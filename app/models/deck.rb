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
      'download_path' => nil,
      'deck_discussions_path' => nil
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

  def deck_discussions_path
    "/deck_discussions/#{self.id}"
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

  # this isn't unique to a deck.
  # its a general purpose function.
  # [items] ex. cards is [{ user_id: 15 },...]
  # returns: { user_id: count }
  def self.sum_by_user_id (items)
    summary = {}
    items.each do |item|
      id = item[:user_id]
      if (summary[id].present?)
        summary[id] += 1
      else
        summary[id] = 1
      end
    end
    summary
  end

  def self.contributions (cards, card_edits)
    edits = card_edits.select { |ce| ce.approved? }
    authors = sum_by_user_id(cards)
    editors = sum_by_user_id(edits)

    {
      authors: authors, # example: {user_id: no_of_cards}
      editors: editors
    }
  end

  def to_csv
    csv_string = CSV.generate do |csv|
      self.cards.each {|c| csv << [ c.question, c.answer ] }
    end
  end
end
