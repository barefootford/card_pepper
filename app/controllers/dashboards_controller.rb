class DashboardsController < ApplicationController
before_action :require_sign_in

  def show
    @user = current_user      
    @decks = current_user.decks.all
  end
end