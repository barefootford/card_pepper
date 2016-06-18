class CardsController < ApplicationController
  before_action :set_deck, only: [:create, :update]
  before_action :set_card, only: [:update]
  before_action :require_sign_in
  before_action :can_create?, only: [:create, :update]
  before_action :must_be_beta_approved
  before_action :set_create_card, only: [:create]
  before_action :set_destroy_card, only: [:destroy]
  before_action :set_destroy_deck, only: [:destroy]

  def create
    if @card.save
      payload = Card.addClientSideAttributes(@card)
      status  = 201
    else
      payload = @card.errors
      status  = 422
    end

    render json: payload, status: status
  end

  def destroy
    return not_permitted unless current_user_owns(@card.deck)

    if @card.destroy
      respond_to do |format|
        format.json { render json: @card, status: 200}
      end
    else
      respond_to :json, :js, :html
      respond_with(@card, status: 400)
    end
  end

  def update
    if @card.update(question: card_params[:question], answer: card_params[:answer])
      payload = Card.addClientSideAttributes(@card)
      status = 200
    else
      payload = @card.errors
      status = 422
    end

    render json: payload, status: status
  end

private
  def set_update_objects
    @card_suggestions = @deck.card_suggestions.pending
    @new_card = @deck.cards.build
    @cards = @deck.cards.saved
  end

  def can_create?
    not_permitted unless current_user_owns(set_deck)
  end

  def card_params
    params.require(:card).permit(:id, :question, :answer).merge(deck_params)
  end

  def deck_params
    params.permit(:id, :deck_id)
  end

  def set_destroy_card
    @card = Card.find(deck_params[:id])
  end

  def set_destroy_deck
    @deck = Deck.find(@card.deck.id)
  end

  def set_create_card
    @card = set_deck.cards.new(card_params)
    @card.user_id = current_user.id
  end

  def set_card
    @card ||= Card.find(card_params[:id])
  end

  def set_deck
    @deck ||= Deck.find(card_params[:deck_id])
  end
end
