class CreateDeckSubscriptions < ActiveRecord::Migration
  def change
    create_table :deck_subscriptions do |t|
      t.references :deck, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
