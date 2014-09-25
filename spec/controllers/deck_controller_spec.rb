require 'spec_helper'

describe DecksController do
  
  describe 'signed-out users' do 
    it 'can view a deck' do 
      create_deck
      
      get :show, id: @deck.id

      expect(response.success?).to be_true
    end
  end

  describe 'while signed in' do 
    it 'users can view another users deck' do 
      create_deck
      session[:user_id] = 2

      get :show, id: @deck.id

      expect(response.success?).to be_true
    end
    
    it 'will not let non-owners edit a deck' do 
      create_user
      create_second_user
      create_deck
      session[:user_id] = 2

      get :edit, id: @deck
      
      expect(response).to redirect_to(root_url)
    end
    
    it 'will not let non-owners update a deck' do
      create_user
      create_second_user
      create_deck

      session[:user_id] = 2

      # patch :update
    end
  end
end  


  

  # it 'will let the owner delete the deck'
  # it 'will let signed in users create decks'
  # it 'will not let signed in users create decks'
