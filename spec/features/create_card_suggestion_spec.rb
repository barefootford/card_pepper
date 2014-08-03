require 'spec_helper'

describe 'Creating a card sugestion' do 
  
  it 'through the show decks page ' do
    create_user
    create_deck
    create_second_user
    sign_in(@user2)
    visit deck_path(@deck)

    fill_in('card-question', with:'Roja')
    fill_in('card-answer', with:'Red')
    click_button('save-card-suggestion')
    byebug
  
    expect(current_path).to eq(deck_path(@deck))
    expect(page).to have_text('Roja')
    expect(page).to have_text('Red')
    expect(page).to have_text('Card suggestion added.')
    byebug
  end
end