class AddStatusToCardSuggestions < ActiveRecord::Migration
  def change
    add_column :card_suggestions, :status, :integer, default: 0
  end
end
