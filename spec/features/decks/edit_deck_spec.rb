require 'spec_helper'

describe 'Editing a deck' do

  before do
    create_user
    create_second_user
    create_deck
  end

  describe 'with an owner account' do
    it 'updates the deck and shows its updated details', js: true do
      sign_in(@user)
      visit edit_deck_path(@deck)

      click_button('deck-settings-toggle-button')

      fill_in 'deck_title', with: deck_attributes[:title]
      click_button 'save-deck'

      expect(current_path).to eq(edit_deck_path(@deck))
      expect(page).to have_text('Deck updated successfully')
      expect(page).to have_text('Pragmatic')
    end
  end

  it 'is not permitted by other users' do
    sign_in(@user2)
    visit edit_deck_path(@deck)

    expect(current_path).to eq(root_path)
    expect(page).to have_text("Only the deck's creator can edit the deck.")
  end
end