require 'spec_helper'

describe 'Editing a card' do
  describe 'while signed in' do
    before(:each) do
      create_user
      sign_in(@user)
      create_deck
      create_card
      visit edit_deck_path(@deck)
    end

    it 'can be done through the decks#edit _index partial', js: true do
      click_button('card-list-toggle-button')
      find_by_id("toggle-card-edit-#{@card.id}").click

      fill_in "edit-card-q-#{@card.id}", with: 'Who is hungry?'
      fill_in "edit-card-a-#{@card.id}", with: 'I am'
      find_by_id("save-card-#{@card.id}").click

      expect(page).to have_text('Card successfully updated.')
      expect(Card.count).to eq(1)
    end
  end
end