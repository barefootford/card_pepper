class CreateDeckFavorites < ActiveRecord::Migration
  def change
    create_table :deck_favorites do |t|
      t.references :user, index: true
      t.references :deck, index: true

      t.timestamps
    end
  end
end
