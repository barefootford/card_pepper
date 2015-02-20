require 'spec_helper'

describe 'while signed in' do
  before(:each) do
    create_user
    create_deck
    sign_in(create_second_user)
  end

  describe 'Creating a card suggestion' do
    it 'through the show decks page ' do
      expect(@deck.card_suggestions.count).to eq(0)
      visit deck_path(@deck)

      fill_in('card-suggestion-question', with:'Roja')
      fill_in('card-suggestion-answer', with:'Red')
      click_button('save-card-suggestion')
      
      expect(current_path).to eq(deck_path(@deck))
      expect(page).to have_text('Card suggestion added.') 
      expect(@deck.card_suggestions.count).to eq(1)
    end
  end
end
