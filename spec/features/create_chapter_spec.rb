require 'spec_helper'

describe 'Creating a chapter' do 

  xit 'can be created from a deck ' do
    create_user_and_sign_in 
    
    visit deck_path(create_a_deck) 
    
    expect(current_path).to eq(deck_path(@deck))
    expect(page).to have_text(deck_attributes[:title])  
  
    click_link 'New Chapter'
    expect(current_path).to eq(new_chapter_path(@deck))
  end
end