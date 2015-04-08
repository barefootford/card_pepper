class CreateUserCards < ActiveRecord::Migration
  def change
    create_table :user_cards do |t|
      t.references :deck_subscription, index: true
      t.references :card, index: true
      t.datetime :last_view
      t.datetime :first_view
      t.float :efficiency
      t.integer :view_count
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
