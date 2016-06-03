class CardSuggestionsController < ApplicationController
  before_action :require_sign_in
  before_action :set_deck, only: [:create]
  before_action :set_deck_and_card_suggestion, only: [:update]
  before_action :user_owns_deck, only: [:update]

  def create
    @card_suggestion = CardSuggestion.new(create_params)
    @card_suggestion.user_id = current_user.id
    @card_suggestion.pending!

    if @card_suggestion.save
      redirect_to @deck,
      notice: "Card suggestion added. The deck's editor will be notified."
    else
      render 'decks/show'
    end
  end

  def update

    # test this works now that we've added statuses.

    case update_params[:status]
    when 'approved'
      if @newly_approved_card = @card_suggestion.approve!
        @newly_approved_card = Card.addClientSideAttributes(@newly_approved_card)
        payload = {
          status: 'card approval success',
          errors: [],
          newlyApprovedCard: @newly_approved_card
        }; status = 200;
      else
        payload = {
          status: 'card approval fail',
          errors: [].push(@newly_approved_card.try(:errors)).flatten,
        }; status = 422;
      end
    when 'rejected'
      if @card_suggestion.reject!
        payload = {
          status: "card rejected success",
          errors: []
        }; status = 200;
      else
        payload = {
          status: "card rejected fail",
          errors: [].push(@card_suggestion.try(:errors)).flatten
        }; status = 422;
      end
    else
      payload = {
        status: "update_params[:status] should be 'approved' or 'rejected. status: #{params[:status]}",
        errors: [ "Unknown error" ],
        id: @card_suggestion.id
      }; status = 422;
    end
    render json: payload, status: status
  end

private
  def user_owns_deck
    errors = { errors: ["Only the decks creator can approve card suggestions."]}
    render json: errors and return unless current_user_owns(@deck)
  end

  def set_deck_and_card_suggestion
    @deck            ||= current_user.decks.find(update_params[:deck_id])
    @card_suggestion ||= @deck.card_suggestions.find(update_params[:id])
  end

  def set_deck
    @deck ||= Deck.find(create_params[:deck_id])
  end

  def update_params
    params.permit(:id, :deck_id, :status)
  end

  def create_params
    params.require(:card_suggestion).permit(:question, :answer).
      merge(params.permit(:card_suggestion_id, :deck_id, :status))
  end
end
