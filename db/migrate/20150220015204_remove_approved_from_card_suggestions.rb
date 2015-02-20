class RemoveApprovedFromCardSuggestions < ActiveRecord::Migration
  def change
    remove_column(:card_suggestions, :approved)
  end
end
