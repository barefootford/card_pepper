class DeckFavoritesController < ApplicationController
  before_action :require_sign_in

  def create
    new_deck_favorite = current_user.deck_favorites.create(deck_id: deck_favorites_params[:id])
    deck_favorites_ids = current_user.deck_favorites.pluck(:deck_id)

    render json: formatted_response(new_deck_favorite, deck_favorites_ids)
  end

  def destroy
    current_user.deck_favorites.where(deck_id: deck_favorites_params[:id]).destroy_all
    deck_favorites_ids = current_user.deck_favorites.pluck(:deck_id)

    render json: formatted_response(nil, deck_favorites_ids)
  end

private
  def formatted_response(new_deck_favorite, deck_favorites_ids)
    {
      # regardless of action return current_user deck_favorites_ids and replace them on the client.
      data: { deckFavoritesIds: deck_favorites_ids },
      # if there aren't errors, convert nil to empty array
      errors: new_deck_favorite.try(:errors).to_a
    }
  end

  def deck_favorites_params
    params.require(:deck).permit(:id)
  end
end
