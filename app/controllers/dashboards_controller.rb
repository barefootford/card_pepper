class DashboardsController < ApplicationController
  before_action :require_sign_in
  before_action :deck_owner_matches_current_user

  def show
    @user = current_user      
    @decks = current_user.decks.all
  end

  def approve
    if current_user.owns_card(suggested_card)
      suggested_card.approve
      redirect_to set_deck,
      notice: 'The card has been approved.'
    else
      redirect_to root_url,
      notice: 'Only the creator can edit the deck.'  
    end
  end

private
  def dashboard_params
    params.permit(:card_suggestion_id)
  end
  
  def suggested_card
    CardSuggestion.find(dashboard_params[:card_suggestion_id].to_i)
  end

  def deck_owner_matches_current_user
    set_card
  end

  def set_card
    # @card_suggestion ||= CardSuggestion.find(params[:card_suggestion_id])     
  end

  def set_deck
    @deck ||= Deck.find(params[:deck_id])
  end
end