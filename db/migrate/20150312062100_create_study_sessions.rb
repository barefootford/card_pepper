class CreateStudySessions < ActiveRecord::Migration
  def change
    create_table :study_sessions do |t|
      t.references :deck_subscription, index: true
      t.references :deck, index: true
      t.references :user, index: true
      t.integer :new_card_goal, default: 5

      t.timestamps
    end
  end
end
