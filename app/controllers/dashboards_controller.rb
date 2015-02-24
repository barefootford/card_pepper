class DashboardsController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved

  def show
    @user = current_user
    @decks = current_user.decks
    card_suggestions_pending?
  end

private
  def card_suggestions_pending?
    @card_suggestions_pending ||= []

    @decks.each do |d|
      return true if @card_suggestions_pending.any?
      @card_suggestions_pending << d.card_suggestions.pending
    end

    @card_suggestions_pending
  end

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