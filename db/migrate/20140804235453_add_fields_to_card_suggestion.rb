class AddFieldsToCardSuggestion < ActiveRecord::Migration
  def change
    add_column :card_suggestions, :approved, :boolean, default: false
  end
end