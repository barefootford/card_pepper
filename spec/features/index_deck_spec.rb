require 'spec_helper.rb'

describe 'Deck Index Page' do 

  before do
    user = User.create!(user_attributes)
    deck = user.decks.create!(title:"Ruby Foundations",
      instructions:"Great for beginners.")
    deck = user.decks.create!(title:"Pragmatic Ruby II")
    deck = user.decks.create!(title:"Pragmatic Rails")

    visit decks_path
  end

  it "shows the title" do
    expect(page).to have_text 'Community Decks'
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
    expect(page).to have_text("Ruby Foundations")
  end

  it "links to show pages" do 
    click_link 'Ruby Foundations'

    expect(page).to have_content "Great for beginners."
  end


end