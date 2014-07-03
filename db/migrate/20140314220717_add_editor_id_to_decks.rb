class AddEditorIdToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :editor, :integer 
  end
end
