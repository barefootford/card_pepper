class CardEditsController < ApplicationController
  before_action :must_be_beta_approved, :current_user
  before_action :set_records, only: [:update]
  before_action :current_user_owns_deck, only: [:update]

  def create
    @card_edit = CardEdit.new(card_edit_params)
    @card_edit.user_id = current_user.id
    @card_edit.save

    if @card_edit.save
      render json: @card_edit, status: :created
    else
      render json: @card_edit.errors, status: :unprocessable_entity
    end
  end

  def update
    if update_params[:status] == 'declined'
      @card_edit.update(update_params.permit(:status, :editor_response))
      @card = @card
      status = 200
    elsif update_params[:status] == 'approved'
      @card_edit.update(update_params.permit(:status, :editor_response))
      @card.update(question: @card_edit.question, answer: @card_edit.answer)
      status = 201
    else 
      @errors = ["Ineligible status. Should be 'declined' or 'approved'. Used: #{update_params[:status]}"]
      status = 422
    end

    response = {
      errors: { cardEdit: @card_edit.errors, card: @card.errors, other: @errors.to_a},
      data: { cardEdit: @card_edit.serializable_hash, card: Card.addClientSideAttributes(@card) }
    }

    respond_to do |format|
      format.json { render json: response, status: status }
    end
  end

private
  def set_records
    card_id = update_params[:card_id]
    card_edit_id = update_params[:card_edit_id]

    @card = Card.where(id: card_id)
      .includes(:card_edits)
      .where('card_edits.id = ?', card_edit_id ).references(:card_edits)
      .first
    @card_edit = @card.card_edits.first

    @deck = Deck.find_by(id: @card.deck_id)
  end

  def update_params
    params.permit(:deck_id, :card_id, :card_edit_id, :status, :editor_response)
  end

  def card_edit_params
    params.require(:card_edit).permit(:question, :answer, :card_id, :reason)
  end

  def current_user_owns_deck
    not_permitted and return unless current_user_owns(@deck)
  end
end
