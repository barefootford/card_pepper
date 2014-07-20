class User < ActiveRecord::Base
  has_many :decks, dependent: :destroy
  has_secure_password

  validates :email, presence: true,                   
                  format: /\A\S+@\S+\z/,
                  uniqueness: { case_sensitive: false }

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
    true    
  end
end
