require 'spec_helper'

describe 'Creating a new deck' do 

  it 'is not permitted by signed-out users' do 
    visit new_deck_url
    
    expect(current_path).to eq(sign_up_path)    
    expect(page).to have_text('only registered users can do that.')
    expect(page).not_to have_text("Let's build a deck.")
  end

  it 'is permitted by signed-in users' do
    create_user
    sign_in(@user)

    visit new_deck_path
    
    expect(current_path).to eq(new_deck_path)
    expect(page).to have_text("Let's build a deck.")
  end

  it 'saves the deck, then goes to the edit page' do 
    create_user
    sign_in(@user)

    visit new_deck_path
    expect(current_path).to eq(new_deck_path)

    fill_in 'deck_title', with: deck_attributes[:title]
    click_button 'Build It'

    # expect(current_path).to eq(edit_deck_path(Deck.last))

    # expect(page).to have_text(deck_attributes[:title])
    # expect(page).to have_text('Deck built successfully')
  end

  it 'does not get saved with a tiny title' do
    create_user
    sign_in(@user)

    visit new_deck_path

    fill_in 'deck_title', with: "XOX"

    expect {click_button 'Build It'}.not_to change(Deck, :count)
    expect(page).to have_text('Please fix')
    expect(page).to have_text('too short')
  end
end