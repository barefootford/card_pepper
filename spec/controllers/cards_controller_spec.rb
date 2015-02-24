require 'spec_helper'

describe CardsController do
  before(:each) do
    create_user
    create_deck
    create_card
    create_second_user
  end

  context 'when not an approved beta user' do
    before(:each) do
      @user = User.first
      @user.pending!
      session[:user_id] = @user.id
    end

    it 'cannot access create action' do
      post :create, deck_id: @deck.id, card: card_attributes

      expect(response).to redirect_to(beta_path)
    end

    it 'cannot access destroy action' do
      delete :destroy, deck_id: @deck.id, id: 1

      expect(response).to redirect_to(beta_path)
    end
  end

  context 'when not signed in' do
    it 'cannot access destroy action' do
      delete :destroy, deck_id: @deck.id, id: @card.id

      expect(response).to redirect_to(sign_up_path)
    end

    it 'cannot access create action' do
      post :create, card: { question: 'Something', answer: "Else" }, deck_id: 1

      expect(response).to redirect_to(sign_up_path)
    end
  end

  context 'when signed in, but not the deck owner' do
    before(:each) do
      session[:user_id] = 2
    end

    it 'cannot access destroy action' do
      delete :destroy, id: @card.id, deck_id: @deck.id

      expect(response).to redirect_to(sign_up_path)
    end

    it 'cannot access destroy action' do
      delete :destroy, deck_id: @deck.id, id: @card.id

      expect(response).to redirect_to(sign_up_path)
    end
  end
end
