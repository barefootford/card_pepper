class DashboardsController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved

  def show
    @user = current_user
    @decks = current_user.decks
    @deck_subscriptions = current_user.deck_subscriptions
    @inactive_deck_subscriptions = current_user.deck_subscriptions.unscoped.inactive
  end

private
  def dashboard_params
    params.permit(:card_suggestion_id)
  end
  
  def suggested_card
    CardSuggestion.find(dashboard_params[:card_suggestion_id].to_i)
  end

  def set_deck
    @deck ||= Deck.find(params[:deck_id])
  end
end