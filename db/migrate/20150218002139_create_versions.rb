class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.references :card, index: true
      t.string :question
      t.string :answer
      t.timestamps
    end
  end
end
