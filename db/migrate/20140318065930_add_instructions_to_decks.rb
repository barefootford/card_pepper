class AddInstructionsToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :instructions, :text
  end
end
