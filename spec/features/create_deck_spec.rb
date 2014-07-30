require 'spec_helper'

describe 'Creating a new deck' do 

  it 'is not permitted by signed-out users' do 
    visit new_deck_url
    
    expect(current_path).to eq(sign_up_path)    
    # expect(page).to have_text('Please sign in first.')
    # expect(page).not_to have_text("Let's build a deck.")
  end

  it 'is permitted by signed-in users' do
    create_a_user
    sign_in(@user)

    visit new_deck_path
    
    expect(current_path).to eq(new_deck_path)
    expect(page).to have_text("Let's build a deck.")
  end

  it 'saves the deck, then shows its details' do 
    create_a_user
    sign_in(@user)

    visit new_deck_path
    expect(current_path).to eq(new_deck_path)

    fill_in 'Title', with: deck_attributes[:title]
    fill_in 'Instructions', with: deck_attributes[:instructions]
    
    click_button 'Create Deck'

    expect(current_path).to eq(deck_path(Deck.last))

    expect(page).to have_text(deck_attributes[:title])
    expect(page).to have_text(deck_attributes[:name])
    expect(page).to have_text('Deck created successfully')
  end

  it 'does not get saved with a tiny title' do
    create_a_user
    sign_in(@user)

    visit new_deck_path

    fill_in 'Title', with: "XOX"
    fill_in 'Instructions', with: deck_attributes[:instructions]

    expect {click_button 'Create Deck'}.not_to change(Deck, :count)
    expect(page).to have_text('error')
  end

  it 'also creates a chapter' do 
    create_a_user
    sign_in(@user)

    visit new_deck_path

    fill_in 'Title', with: 'Big Deck of Cards'
    fill_in 'Instructions', with: 'Jokers are wild.'
  
    click_button 'Create Deck'

    expect(Deck.last.chapters.size).to eq(1)
    expect(page).to have_text('Chapter 1')
  end
end