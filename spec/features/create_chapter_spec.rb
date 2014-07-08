require 'spec_helper'

describe 'Creating a chapter' do 

  it 'is created from a deck, saved, then shows itself' do
    create_user_and_sign_in 
    
    visit deck_path(create_a_deck) 
    
    expect(current_path).to eq(deck_path(@deck))
    expect(page).to have_text(deck_attributes[:title])
    
    click_link 'New Chapter'
    expect(current_path).to eq(new_deck_chapter_path(@deck))
    
    fill_in 'Title', with: chapter_attributes[:title]
    click_button 'Save'
    
    expect(current_path).to eq(chapter_path(Chapter.last))
    expect(page).to have_text(chapter_attributes[:title])
  end
end