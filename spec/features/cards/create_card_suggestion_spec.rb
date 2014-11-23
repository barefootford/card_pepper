require 'spec_helper'

describe 'Creating a card suggestion' do 
  
  it 'through the show decks page ' do
    create_user
    create_deck
    create_second_user
    sign_in(@user2)
    visit deck_path(@deck)

    fill_in('card-question', with:'Roja')
    fill_in('card-answer', with:'Red')
    click_button('save-card-suggestion')
  
    expect(current_path).to eq(deck_path(@deck))
    
    expect(page).to have_text('Card suggestion added.') 
  end
end