class CreateCardSuggestions < ActiveRecord::Migration
  def change
    create_table :card_suggestions do |t|
      t.string :question
      t.string :answer
      t.string :purpose
      t.references :user, index: true
      t.references :chapter, index: true
      t.timestamps
    end
  end
end
