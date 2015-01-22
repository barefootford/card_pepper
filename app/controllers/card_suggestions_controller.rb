class CardSuggestionsController < ApplicationController
  before_action :set_deck, only: [:create]
  before_action :require_sign_in

  def create
    @card = CardSuggestion.new(card_suggestion_params)  
    @card.user_id = current_user.id

    if @card.save
      redirect_to @card.deck,
      notice: "Card suggestion added. The Deck's editor will be notified."
    else
      render 'decks/show'
    end
  end

  def approve
    if current_user.owns_deck_for(card_suggestion)
      card_suggestion.approve
      redirect_to edit_deck_path(set_deck),
      notice: 'The card has been approved and added to the deck.'
    else
      redirect_to root_url,
      notice: 'Only the creator can edit the deck.'  
    end
  end

private
  def card_suggestion
    @card_suggestion ||= CardSuggestion.find(card_suggestion_params[:card_suggestion_id])
  end

  def set_deck
    @deck ||= Deck.find(card_suggestion_params[:deck_id])
  end

  def card_suggestion_params
    params.permit(:question, :answer, :card_suggestion_id, :deck_id)
  end
end
