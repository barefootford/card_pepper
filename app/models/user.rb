class User < ActiveRecord::Base
  enum beta_status: { pending: 0, approved: 1 }

  has_many :decks, dependent: :destroy
  has_many :cards, through: :decks
  has_many :deck_subscriptions

  has_secure_password

  validates :email, presence: true,
                  format: /\A\S+@\S+\z/,
                  uniqueness: { case_sensitive: false }
  validates :first_name, :last_name, length: { minimum: 2, maximum: 100 }
  validates :password, length: { minimum: 6, maximum: 20, allow_blank: true }

  def client_side
    {
      name: self.name,
      id: self.id,
      website: self.website
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

  def website=(website)
    self[:website] = website
  end

  def website
    return nil if self[:website].nil? || self[:website].blank?  
    return self[:website] if self[:website].include?('http' || 'https')
    return "http://#{self[:website]}"
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
