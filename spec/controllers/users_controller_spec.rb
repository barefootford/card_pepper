require 'spec_helper'

describe UsersController do
  before(:each) do
    create_user
  end

  context 'when not an approved beta tester' do
    before(:each) do
      @user = User.first
      @user.pending!
      session[:user_id] = User.first
    end

    it 'cannot access show' do
      get :show, id: 1

      expect(response).to redirect_to(beta_path)
    end
  end
end