class DeckFavoritesController < ApplicationController
  before_action :require_sign_in

  def create
    new_deck_favorite = current_user.deck_favorites.create(deck_favorites_params)
    deck_favorites_ids = current_user.deck_favorites.pluck(:deck_ids)

    render json: formatted_response(new_deck_favorite, deck_favorites_ids)
  end

  def destroy
    deck_id = deck_favorites_params[:deck_id]
    current_user.deck_favorites.where(deck_id: deck_id).limit(1).first.destroy!
    deck_favorites_ids = current_user.deck_favorites.pluck(:deck_ids)

    render json: formatted_response(nil, deck_favorites_ids)
  end

private
  def formatted_response(new_deck_favorite, deck_favorites_ids)
    {
      data: { deck_favorites_ids: deck_favorites_ids },
      errors: new_deck_favorite.try(:errors).to_a
    }
  end

  def deck_favorites_params
    params.permit(:deck_id)
  end
end
