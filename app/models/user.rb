class User < ActiveRecord::Base
  has_many :decks
  has_secure_password

  validates :name, length: { minimum: 2 }
  validates :email, presence: true,                   
                  format: /\A\S+@\S+\z/,
                  uniqueness: { case_sensitive: false }

  def self.authenticate(email, password)
    user = User.find_by(email: email)
    user && user.authenticate(password)              
  end            
end
