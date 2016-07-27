class User < ActiveRecord::Base
  enum beta_status: { pending: 0, approved: 1 }

  has_many :decks, dependent: :destroy
  has_many :cards, through: :decks
  has_many :deck_subscriptions, dependent: :destroy
  has_many :deck_favorites, dependent: :destroy

  has_secure_password

  validates :email, presence: true,
                  format: /\A\S+@\S+\z/,
                  uniqueness: { case_sensitive: false }
  validates :first_name, :last_name, length: { minimum: 2, maximum: 100 }
  validates :password, length: { minimum: 6, maximum: 20, allow_blank: true }

  # For ActiveModel::Serialization
  # call .serializable_hash or .to_json
  def attributes
    {
      'name' => nil,
      'id' => nil,
      'website' => nil,
      'profile_path' => nil,
      'deck_favorites_ids' => nil
    }
  end

  def self.authenticate(email, password)
    user = User.find_by(email: email)
    user && user.authenticate(password)
  end

  def subscribes_to(deck)
    deck_subscriptions.pluck(:deck_id).include?(deck.id)
  end

  def card_suggestions
    @card_suggestions = []

    decks.each do |deck|
      deck.card_suggestions.each do |card|
        @card_suggestions << card
      end
    end

    @card_suggestions
  end

  def name
    "#{first_name} #{last_name}"
  end

  def initials
    "#{first_name[0]}#{last_name[0]}'s"
  end

  def website?
    return true unless website.blank?
  end

  def deck_favorites_ids
    deck_favorites.collect {|df| df.deck_id}
  end

  def profile_path
    user = self
    Rails.application.routes.url_helpers.user_path(user)
  end

  def website=(website)
    self[:website] = website
  end

  def website
    if self[:website].nil? || self[:website].blank?
      ''
    elsif self[:website].include?('http' || 'https')
      self[:website]
    else 
      "http://#{self[:website]}"
    end
  end

  def update_password(password_params)
    self.password              = password_params[:new_password]
    self.password_confirmation = password_params[:new_password_confirmation]
    self.valid?

    if self.errors.any?
      return false
    else
      self.save
    end
  end

  def card_count
    @card_count = 0

    decks.each do |deck|
      @card_count += deck.card_count
    end

    @card_count
  end

  def has_decks?
    decks.all.count > 0
  end

  def owns_deck_for(card_suggestion)
    self == card_suggestion.deck.user
  end

  def deck_count
    @deck_count = decks.count
  end

  def new?
    self.created_at > Time.now-30.days
  end
end