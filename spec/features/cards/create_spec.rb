require 'spec_helper'

describe 'Creating a new card' do
  describe 'while signed in', js: true do
    before(:each) do
      create_user_and_sign_in
      create_deck
      visit edit_deck_path(@deck)
    end

    describe 'with a valid card entry', js: true do
      before do 
        fill_in 'new-card-question', with: "What is the Spanish word for blue?"
        fill_in 'new-card-answer', with: 'Azul'
        click_button 'save-card-button'
      end

      it 'shows that adding a card was successful', js: true do
        expect(page).to have_text('Card Added')
      end

      it 'updates and prepares the page to have another card added', js: true do
        expect(find_field('new-card-question').value).to eq('')
        expect(find_field('new-card-answer').value).to eq('')

        expect(find_by_id('card-count-label').text).to include('1 card')
      end

      it 'adds the cards to the cards#_index partial', js: true do
        click_button('card-list-toggle-button')
        expect(page).to have_text('What is the Spanish word for blue?')
      end
    end

    describe 'with an invalid card entry', js: true do
      before do 
        fill_in 'new-card-question', with: ''
        fill_in 'new-card-answer', with: ''

        click_button 'save-card-button'
      end

      it 'shows validation errors', js: true do
        expect(page).to have_text("Answer can't be blank")
        expect(page).to have_text("Question can't be blank")
      end
    end
  end
end