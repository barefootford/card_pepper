class RemoveEditorFromDecks < ActiveRecord::Migration
  def change
    remove_column :decks, :editor
  end
end
