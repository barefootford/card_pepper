class DashboardController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved

  def show
    @user = User.where(id: current_user.id).includes(:decks).first
    @decks = @user.decks
    # @deck_subscriptions = @user.deck_subscriptions.active
    # @deck_subscriptions.each { |ds| ds.sync }
    # @inactive_deck_subscriptions = @user.deck_subscriptions.inactive
  end
end