class UpdateCardSuggestionSchema < ActiveRecord::Migration
  def change
		rename_column(:card_suggestions, :chapter_id, :deck_id)
  end
end
