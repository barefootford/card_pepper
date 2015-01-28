def create_user
  @user = User.create(user_attributes)
end

def create_second_user
  @user2 = User.create!(user_attributes(first_name:'Second', email:'user2@example.com'))
end

def create_deck
  @deck = Deck.create!(deck_attributes)
end

def create_card
  @card = @deck.cards.new(card_attributes)
end

def create_user_and_sign_in
  create_user
  sign_in(@user)
end

def sign_in(user)
  visit new_session_path
  fill_in 'email', with: user.email
  fill_in 'password', with: user.password
  click_on 'sign-in-btn'
end

def user_attributes(overrides = {})
  {
    first_name: 'Example',
    last_name: 'User',
    email: 'user@example.com',
    password: 'secret',
    password_confirmation: 'secret'
  }.merge(overrides)
end

def deck_attributes(overrides = {})
  {
    title:'Pragmatic Studio Ruby Notes',
    user_id:1,
    instructions:"Use this deck promptly after finishing the class and you'll do really well."
  }.merge(overrides)
end

def card_attributes(overrides = {})
  {
    question: 'Is the sky blue?',
    answer: 'Yes'
  }.merge(overrides)
end