require 'spec_helper'

describe "Editing a deck" do 
  
  it "updates the deck and shows its updated details" do 
    create_a_user
    sign_in(@user)
    
    deck = @user.decks.create!(deck_attributes)

    visit edit_deck_url(deck)

    expect(current_path).to eq(edit_deck_path(deck))

    expect(find_field('Title').value).to eq(deck.title)

    fill_in "Title", with: "Pragmatic Ruby Motion"

    click_button 'Update Deck'

    expect(current_path).to eq(deck_path(deck))

    expect(page).to have_text("Pragmatic Ruby Motion")
  end

  it 'is not permitted by other users' do
    create_a_user
    sign_in(@user)
    
    deck = @user.decks.create!(deck_attributes)
    
    visit root_url

    click_link 'Sign Out'

    user2 = User.create!(user_attributes(name: "Example User 2", email:"Example@user.com"))
    sign_in(user2)

    visit edit_deck_path(deck)
    
    expect(current_path).to eq(root_path)
  end
end