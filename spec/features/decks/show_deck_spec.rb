require 'spec_helper.rb'

describe "Viewing a deck" do
  
  before do 
    create_user
    create_deck
  end

  it 'should list its details' do
    visit deck_path(@deck)

    expect(page).to have_text deck_attributes[:title]
    expect(page).to have_text deck_attributes[:name]
    expect(page).to have_text deck_attributes[:instructions]
    expect(page).to have_link 'Decks'
  end
end
