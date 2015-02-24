require 'spec_helper'

describe 'Deck Index Page' do 

  before(:each) do
    @user = User.create!(user_attributes)
    create_deck
    @user.decks.create!(title:'Pragmatic Ruby II')
    @user.decks.create!(title:'Pragmatic Rails')
    sign_in(@user)

    visit decks_path
  end

  it 'shows all decks' do
    expect(page).to have_text('Pragmatic Rails')
    expect(page).to have_text('Pragmatic Ruby II')
    expect(page).to have_text(deck_attributes[:title])
  end

  it 'links to show pages' do
    expect(page).to have_link deck_attributes[:title]
    click_link deck_attributes[:title]

    expect(page).to have_content deck_attributes[:instructions]
  end
end