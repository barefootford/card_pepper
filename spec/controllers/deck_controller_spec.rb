require 'spec_helper'

describe DecksController do

  before do
    create_user
    create_second_user
    create_deck
  end

  describe 'signed out users' do
    it 'can view a deck' do
      get :show, id: @deck.id

      expect(response.success?).to be_true
    end
    
    it 'cannot create decks' do
      get :new

      expect(response).to redirect_to(sign_up_path)
    end

    it 'cannot edit decks' do 
      get :edit, id: @deck.id

      expect(response).to redirect_to(sign_up_path)
    end

    it 'cannot update decks' do
      patch :update, id: @deck.id

      expect(response).to redirect_to(sign_up_path)
    end
    
    it 'cannot delete decks' do
      delete :destroy, id: @deck.id

      expect(response).to redirect_to(sign_up_path)
    end
  end

  describe 'while signed in' do
    before do
      session[:user_id] = 99
    end

    it 'users can view individual decks' do
      get :show, id: @deck.id

      expect(response.success?).to be_true
    end

    it 'can view the decks index view' do
      get :index

      expect(response.success?).to be_true
    end

    describe 'permissions' do
      describe 'for non owners' do
        before do 
          session[:user_id] = 2
          #set the session to an id other than the owner of deck 1
        end

        it 'will not allow editing a deck' do
          get :edit, id: @deck.id

          expect(response).to redirect_to(root_url)
        end

        it 'will not allow updating a deck' do
          patch :update, id: @deck.id

          expect(response).to redirect_to(root_url)
        end

        it 'will not allow deleting a deck' do
          delete :destroy, id: @deck.id

          expect(response).to redirect_to(root_url)
        end
      end
    end
  end
end