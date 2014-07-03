class AddUserReferencesToDecks < ActiveRecord::Migration
  def change
    add_reference :decks, :user, index: true
  end
end
