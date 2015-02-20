require 'spec_helper'

describe 'Managing card suggestions' do
  before(:each) do
    create_user
    create_deck
    create_second_user
    create_card_suggestion

    sign_in(User.first)
    visit edit_deck_path(@deck)
  end

  describe 'Approving card suggestions through deck#edit page', js: true do
    it 'works through the deck#edit page' do
      expect(page).to have_button('Card Suggestions')
      click_button('Card Suggestions')
      click_link("approve-#{@card_suggestion.id}")

      expect(current_path).to eq(edit_deck_path(@deck))
      expect(CardSuggestion.first.status).to eq('approved')
    end
  end

  describe 'rejecting card suggestions' do
    xit 'works through the deck#edit page', js: true do
      expect(page).to have_text('Card Suggestions')
      click_button('Card Suggestions')

      expect(page).to have_link('Reject')
      click_button('Reject')
    end
  end
end
