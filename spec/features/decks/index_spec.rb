require 'spec_helper'

describe 'Deck Index Page' do 

  before do
    user = User.create!(user_attributes)
    deck = create_deck
    deck = user.decks.create!(title:"Pragmatic Ruby II")
    deck = user.decks.create!(title:"Pragmatic Rails")

    visit decks_path
  end

  it "shows the title" do
    expect(page).to have_text 'Top Decks'
  end

  it 'is allowed by signed out users' do 
    visit root_url
    expect(current_url).to eq(root_url)

    visit decks_path
    expect(current_path).to eq(decks_path)
  end

  it "shows all the decks" do
    expect(page).to have_text("Pragmatic Rails")
    expect(page).to have_text("Pragmatic Ruby II")
    expect(page).to have_text(deck_attributes[:title])
  end

  it "links to show pages" do 
    expect(page).to have_link deck_attributes[:title]
    click_link deck_attributes[:title]

    expect(page).to have_content deck_attributes[:instructions]
  end


end