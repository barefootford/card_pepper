def create_a_user
  @user = User.create!(user_attributes)  
end

def create_a_deck
  @deck = Deck.create!(deck_attributes)
end

def create_user_and_sign_in
  create_a_user
  sign_in(@user)  
  create_a_deck
end

def sign_in(user)
  visit new_session_url

  fill_in 'Email', with: user.email
  fill_in 'Password', with: user.password

  click_button 'Sign In!'
end

# Attributes

def user_attributes(overrides = {})
  {
    name: "Example User",
    email: "user@example.com",
    password: "secret",
    password_confirmation: "secret"
  }.merge(overrides)
end

def deck_attributes(overrides = {})
  {
    title:"Pragmatic Studio Ruby Notes",
    user_id:1,
    instructions:"Use this deck promptly after finishing the class and you'll do really well."
  }.merge(overrides)
end

def chapter_attributes(overrides = {})
  {
    title: 'Chapter 1: Ruby Handshakes',
    deck_id: 1
  }.merge(overrides)  
end

