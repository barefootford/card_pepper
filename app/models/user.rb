class User < ActiveRecord::Base
  has_many :decks, dependent: :destroy
  has_secure_password

  validates :email, presence: true,                   
                  format: /\A\S+@\S+\z/,
                  uniqueness: { case_sensitive: false }
  validates :first_name, :last_name, length: { minimum: 2, maximum: 100 }                 

  def self.authenticate(email, password)
    user = User.find_by(email: email)
    user && user.authenticate(password)          
  end

  def name
    "#{first_name} #{last_name}"    
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
    byebug
    self.password              = password_params[:new_password]
    self.password_confirmation = password_params[:new_password_confirmation]
    self.save
  end

  def card_count
    @card_count = 0

    decks.each do |deck|
      @card_count += deck.card_count
    end

    @card_count
  end

  def new?
    self.created_at > Time.now-30.days    
  end
end
