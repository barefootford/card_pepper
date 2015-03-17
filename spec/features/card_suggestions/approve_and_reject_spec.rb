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
      find_by_id("approve-#{@card_suggestion.id}").click

      expect(page).to have_text('Card approved and added to deck.')
      expect(CardSuggestion.first).not_to be_pending
      expect(CardSuggestion.first).to be_approved
    end
  end

  describe 'rejecting card suggestions' do
    it 'works through the deck#edit page', js: true do
      expect(page).to have_text('Card Suggestions')
      click_button('Card Suggestions')
      find_by_id("reject-#{@card_suggestion.id}").click

      expect(page).to have_text('Card rejected and not added to deck.')
      expect(CardSuggestion.first).not_to be_pending
      expect(CardSuggestion.first).to be_rejected
    end
  end
end
