require 'spec_helper'

describe 'Deleting a deck' do 
  before do 
    @user = User.create!(user_attributes)
    @deck = @user.decks.create!(deck_attributes)
  end

  it 'can be performed by the decks creator' do 
    sign_in(@user)

    visit deck_path(@deck)

    expect(page).to have_link ('Delete Deck')
    # click_link('Delete Deck')

    # expect(Deck.all.count).to eq(0)

    # expect(current_url).to eq(root_url)
    # expect(page).to have_text("Deck deleted successfully.")
  end

  it 'is impossible for someone other than its creator' do 
    @user2 = User.create!(user_attributes(email:"User2@example.com", name:"Example User 2"))
    sign_in(@user2)

    visit deck_path(@deck)
    expect(page).not_to have_link('Delete Deck')
  end
end