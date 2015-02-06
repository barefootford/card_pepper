require 'spec_helper'

describe 'Deleting a deck' do
  before do
    create_user
    create_deck
    create_second_user
  end

  it 'can be done by the decks creator', js: true do
    sign_in(@user)
    visit edit_deck_path(@deck)
    click_button('deck-settings-toggle-button')

    click_link('Delete Deck')

    expect(current_path).to eq(root_path)
    expect(@user.decks.count).to eq(0)
    expect(page).to have_text('Deck deleted successfully.')
  end

  it 'cannot be done by the decks non-owner' do
    sign_in(@user2)
    visit edit_deck_path(@deck)

    expect(current_path).to eq(root_path)
    expect(page).to have_text("Only the deck's creator can edit the deck.")
  end
end