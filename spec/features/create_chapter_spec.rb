require 'spec_helper'

describe 'Creating a chapter' do 

  it 'can be done through a deck' do
    create_user_and_sign_in 
    create_deck

    visit edit_deck_path(@deck)
    
    expect(current_path).to eq(edit_deck_path(@deck))
    expect(page).to have_text(deck_attributes[:title])
    expect(@deck.chapters.count).to eq(1)

    fill_in 'chapter_title', with: 'Second chapter'
    click_button 'save-deck-chapter'
 
    expect(current_path).to eq(edit_deck_path(@deck))
    expect(@deck.chapters.count).to eq(2)
    expect(page).to have_text('Chapter added')
    expect(page).to have_text('Second chapter')   
  end
end