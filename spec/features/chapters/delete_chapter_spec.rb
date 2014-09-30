require 'spec_helper'

describe 'Deleting a chapter' do 

  it 'can be done by its owner' do 
    create_user_and_sign_in
    create_deck

    visit edit_deck_path(@deck)
    expect(current_path).to eq(edit_deck_path(@deck))
    expect(@deck.chapters.count).to eq(1)    

    click_link('X')

    expect(@deck.chapters.count).to eq(0)
    expect(page).to have_text('Chapter deleted')
  end

  it 'cannot be done by others' do 
    @user = create_user
    create_deck

    @user2 = create_second_user
    sign_in(@user2)

    visit edit_deck_path(@deck)
    expect(current_path).not_to eq(edit_deck_path(@deck))
    expect(page).to have_text("Only the deck's creator can edit")
  end
end
