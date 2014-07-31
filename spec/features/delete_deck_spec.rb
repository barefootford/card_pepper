require 'spec_helper'

describe 'Deleting a deck' do 
  before do 
    create_user
    create_deck
  end

  it 'can be done by the decks creator' do 
    sign_in(@user)
    visit edit_deck_path(@deck)
    expect(@user.decks.count).to eq(1)
    
    click_link('Delete Deck')

    expect(current_url).to eq(root_url)
    expect(@user.decks.count).to eq(0)
    expect(page).to have_text("Deck deleted successfully.")
  end

  it 'cannot be done someone else' do 
    @user2 = User.create!(user_attributes(email:"User2@example.com", first_name:'Another', last_name:'User'))
    sign_in(@user2)

    visit edit_deck_path(@deck)
   
    expect(current_path).to eq(root_path)
    expect(page).not_to have_link('Delete Deck')
    expect(page).to have_text("Only the deck's creator can edit the deck")
  end
end