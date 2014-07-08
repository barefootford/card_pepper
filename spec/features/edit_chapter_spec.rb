require 'spec_helper'

describe "Editing a chapter" do 

  before do 
    @chapter = Chapter.create!(chapter_attributes)
  end

  let(:new_title) { "New Chapter Name" }

  it "can have its title changed" do
    create_user_and_sign_in 
    visit chapter_path(@chapter)
    
    expect(page).to have_text(chapter_attributes[:title])
    
    click_link "Edit"
    expect(current_path).to eq(edit_chapter_path(@chapter))
    expect(page).to have_text "Editing:"
    expect(page).to have_text(@chapter.title)

    fill_in "Title", with: new_title 
    click_button 'Save'

    expect(current_path).to eq(chapter_path(@chapter))
    expect(page).to have_text(new_title)
  end

  it 'can only be edited by its owner'
end