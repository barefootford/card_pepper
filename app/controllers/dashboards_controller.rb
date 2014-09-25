class DashboardsController < ApplicationController
before_action :require_sign_in
before_action :deck_owner_matches_current_user

  def show
    @user = current_user      
    @decks = current_user.decks.all
  end

  def approve
    if users_match?(current_user, set_card.chapter.deck.user)
      @card = set_card
      @deck = set_deck
      @chapter = @deck.
      byebug

      @deck

      @new_card = set_deck.chapters

    else
      redirect_to root_url,
      notice: 'Only the creator can edit the deck.'  
    end
  end

private
  
  def deck_owner_matches_current_user
    set_card    
  end

  def set_card
    @card_suggestion ||= CardSuggestion.find(params[:card_suggestion_id])     
  end

  def set_deck
    @deck ||= Deck.find(params[:deck_id])
  end
end