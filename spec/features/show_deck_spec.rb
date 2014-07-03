require 'spec_helper.rb'

describe "Viewing a deck" do
  
  it 'should list its details' do
    create_a_user
    deck = @user.decks.create!(deck_attributes)

    visit deck_path(deck)

    expect(page).to have_text deck_attributes[:title]
    expect(page).to have_text deck_attributes[:name]
    
    expect(page).to have_text deck_attributes[:instructions]
  end

  it 'links back to the index' do 
    create_a_user
    deck = @user.decks.create!(deck_attributes)

    visit deck_path(deck)    

    expect(current_path).to eq(deck_path(deck))

    click_link 'All Decks'
    expect(current_path).to eq(decks_path)
  end

end
