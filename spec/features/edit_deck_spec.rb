require 'spec_helper'

describe "Editing a deck" do 
  
  it "updates the deck and shows its updated details" do 
    create_user_and_sign_in
    create_deck

    visit edit_deck_url(@deck)

    expect(current_path).to eq(edit_deck_path(@deck))
    expect(page).to have_text(deck_attributes[:title])
    
    fill_in 'deck_title', with: 'Pragmatic Ruby Motion'
    click_button 'save-deck'

    expect(current_path).to eq(edit_deck_path(@deck))
    expect(page).to have_text("Deck updated successfully")
    expect(page).to have_text("Pragmatic Ruby Motion")
  end

  it 'is not permitted by other users' do
    create_user
    create_deck

    create_second_user
    
    sign_in(@user2)
    visit edit_deck_path(@deck)
    
    expect(current_path).to eq(root_path)
    expect(page).to have_text("Only the deck's creator can edit the deck.")
  end

  it 'lists its chapters with delete and edit links' do 
    create_user_and_sign_in
    create_deck

    visit edit_deck_path(@deck)

    expect(page).to have_text('Chapter 1: Ruby Handshakes')
    expect(page).to have_link('Edit')
    expect(page).to have_link('X')
  end

end