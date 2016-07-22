class CreateCardEdits < ActiveRecord::Migration
  def change
    create_table :card_edits do |t|
      t.integer :user_id
      t.references :card, index: true
      t.string :question
      t.string :answer

      t.timestamps
    end
  end
end
