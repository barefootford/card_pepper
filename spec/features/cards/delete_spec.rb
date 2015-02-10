require 'spec_helper'

describe 'Deleting a card' do
  describe 'while signed in' do
    before(:each) do
      sign_in(create_user)
      create_deck
      create_card
      visit edit_deck_path(@deck)
    end

    it 'can be done through the decks#edit _index partial', js: true do
      click_button('card-list-toggle-button')
      expect(page).to have_text(card_attributes[:question])
      expect(page).to have_text(card_attributes[:answer])

      click_link("card-delete-1")
      expect(page).to have_text('Card Deleted.')
      expect(page).not_to have_text(card_attributes[:question])
      expect(Card.count).to eq(0)
    end
  end
end