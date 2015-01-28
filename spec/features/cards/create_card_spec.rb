require 'spec_helper'

describe 'Creating a new card' do

  describe 'while signed in' do

    before(:each) do
      create_user_and_sign_in
      create_deck
      visit edit_deck_path(@deck)
    end

    it 'is permitted by an editor', js: true do
      fill_in 'new-card-question', with: "What is the Spanish word for blue?"
      fill_in 'new-card-answer', with: 'Azul'

      click_button 'save-card-button'

      expect(find_field('new-card-question').value).to eq('')
      expect(find_field('new-card-answer').value).to eq('')
      expect(page).to have_text('Card Added')
    end
    
    it 'shows validation errors', js: true do
      fill_in 'new-card-question', with: ''
      fill_in 'new-card-answer', with: ''

      click_button 'save-card-button'

      expect(page).to have_text("Answer can't be blank")
      expect(page).to have_text("Question can't be blank")
    end
  end
end