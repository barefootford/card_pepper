class CardSuggestionsController < ApplicationController
  before_action :require_sign_in
  before_action :set_deck, only: [:create]
  before_action :set_card_suggestion_and_deck, only: [:update]

  def create
    @card_suggestion = CardSuggestion.new(create_params)
    @card_suggestion.user_id = current_user.id
    @card_suggestion.pending!

    if @card_suggestion.save
      redirect_to @deck,
      notice: "Card suggestion added. The Deck's editor will be notified."
    else
      render 'decks/show'
    end
  end

  def update
    not_permitted unless current_user_owns(@deck)
    set_card_suggestion_status

    case @card_suggestion.status
    when 'approved'
      @card_suggestion.add_to_deck
      redirect_to edit_deck_path(@deck), notice: 'Card approved and added to deck.'
    when 'rejected'
      @card_suggestion.reject_from_deck
      redirect_to edit_deck_path(@deck), notice: 'Card rejected and not added to deck.'
    else
      redirect_to edit_deck_path(@deck), notice: 'Invalid card status.'
    end
  end

private
  def set_card_suggestion_and_deck
    @card_suggestion ||= CardSuggestion.find(update_params[:id])
    @deck            ||= Deck.find(update_params[:deck_id])
  end

  def set_deck
    @deck ||= Deck.find(create_params[:deck_id])
  end

  def set_card_suggestion_status
    return @card_suggestion.approved! if update_params[:status] == 'approved'
    return @card_suggestion.rejected! if update_params[:status] == 'rejected'
  end

  def update_params
    params.permit(:id, :deck_id, :status)
  end

  def create_params
    params.require(:card_suggestion).permit(:question, :answer).
      merge(params.permit(:card_suggestion_id, :deck_id, :status))
  end
end
