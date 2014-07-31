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

  it 'should list an edit link for its editor' do 
    sign_in(@user)
    
    visit deck_path(@deck)

    expect(page).to have_link('Edit')
  end

  it 'should not show an edit link for other users' do 
    create_second_user
    sign_in(@user2)

    visit deck_path(@deck)

    expect(page).not_to have_link('Edit')
  end
end
