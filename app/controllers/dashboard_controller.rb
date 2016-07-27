class DashboardController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved

  # has_many decks, through deck_favorites?

  def show
    @owned_decks = current_user.decks.map(&:serializable_hash)
    deck_favorites_ids = current_user.deck_favorites.select(&:deck_id)

    @favorited_decks = Deck.where.not(user_id: current_user.id).where(id: deck_favorites_ids).includes(:user)
    @favorited_decks_editors = @favorited_decks.collect(&:user)
  end
end
