require 'spec_helper'

describe DecksController do

  describe 'when not an approved beta tester' do
    before(:each) do
      @user = User.create!(user_attributes(beta_status: :pending))
      create_deck
      session[:user_id] = @user.id
    end

    describe 'actions' do
      it 'cannot access index' do
        get :index

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access show' do
        get :show, id: @deck.id

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access new' do
        get :new

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access create action' do
        post :create, card: card_attributes

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access edit action' do 
        get :edit, id: @deck.id

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access update action' do
        patch :update, id: @deck.id

        expect(response).to redirect_to(beta_path)
      end

      it 'cannot access destroy action' do
        delete :destroy, id: @deck.id

        expect(response).to redirect_to(beta_path)
      end
    end
  end

  describe 'while an approved beta user' do 
    before do
      create_user
      create_second_user
      create_deck
    end

    describe 'signed out users' do
      it 'cannot access create action' do
        get :new

        expect(response).to redirect_to(sign_up_path)
      end

      it 'cannot access edit action' do 
        get :edit, id: @deck.id

        expect(response).to redirect_to(sign_up_path)
      end

      it 'cannot access update action' do
        patch :update, id: @deck.id

        expect(response).to redirect_to(sign_up_path)
      end

      it 'cannot access destroy action' do
        delete :destroy, id: @deck.id

        expect(response).to redirect_to(sign_up_path)
      end
    end

    describe 'while signed in' do
      before do
        session[:user_id] = 1
      end

      it 'users can access show action' do
        get :show, id: @deck.id

        expect(response.success?).to be_true
      end

      it 'can access index action' do
        get :index

        expect(response.success?).to be_true
      end

      describe 'permissions' do
        describe 'for non owners' do
          before do 
            session[:user_id] = 2
            #set the session to an id other than the owner of deck 1
          end

          it 'cannot access edit action' do
            get :edit, id: @deck.id

            expect(response).to redirect_to(root_url)
          end

          it 'cannot access update action' do
            patch :update, id: @deck.id

            expect(response).to redirect_to(root_url)
          end

          it 'cannot access destroy action' do
            delete :destroy, id: @deck.id

            expect(response).to redirect_to(root_url)
          end
        end
      end
    end
  end
end