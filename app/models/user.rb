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
end
