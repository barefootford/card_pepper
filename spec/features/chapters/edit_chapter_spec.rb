require 'spec_helper'

describe "Editing a chapter" do 

  it 'can be done by its editor' do
    create_user_and_sign_in
    create_deck

    visit edit_deck_path(@deck)
    click_link("edit-chapter-#{@deck.chapters.first.id}")

    expect(current_path).to eq(edit_chapter_path(@chapter))
    expect(page).to have_text(chapter_attributes[:title])
    expect(page).to have_text "Editing:"
    
    fill_in 'chapter_title', with: 'The New Chapter Title' 
    click_button 'save-chapter'

    expect(current_path).to eq(edit_deck_path(@deck))
    expect(page).to have_text('Chapter title updated')
  end

  it 'cannot be done by others' do 
    create_user
    create_deck
    create_second_user
    sign_in(@user2)

    visit edit_deck_path(@deck)

    expect(current_path).not_to eq(edit_deck_path(@deck))
    expect(page).to have_text("Only the deck's creator can edit the deck")
  end
end