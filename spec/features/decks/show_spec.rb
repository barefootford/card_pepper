require 'spec_helper'

describe 'Viewing a deck' do

  before do 
    create_user
    create_deck
  end

  it 'shows its details' do
    visit deck_path(@deck)

    expect(page).to have_text deck_attributes[:title]
    expect(page).to have_text deck_attributes[:name]
    expect(page).to have_text deck_attributes[:instructions]
  end
end
