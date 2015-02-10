class CardsController < ApplicationController
  before_action :set_deck, only: [ :create ]

  def create
    @card = set_deck.cards.new(card_params)

    respond_to do |format|
      format.js { create_card_js } 
    end
  end

  def destroy
    @card = Card.find(destroy_params[:id])
    @deck = Deck.find(@card.deck.id)
    @card.destroy

    respond_to do |format|
      format.js { render :deleted }
      format.html { redirect_to edit_deck_path(@deck), notice: 'Card deleted.', status: 303 }
    end
  end

private
  
  def destroy_params
    params.permit(:id, :deck_id)
  end

  def card_params
      params.require(:card).permit(:id, :question, :answer).merge(deck_params)
  end

  def create_card_js
    if @card.save
      render :create
    else
      render :errors
    end
  end

  def deck_params
    params.permit(:deck_id)
  end

  def card
    @card ||= Card.find(card_params[:id])
  end

  def set_deck
    @deck ||= Deck.find(card_params[:deck_id])
  end
end
