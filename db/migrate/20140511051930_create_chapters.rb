class CreateChapters < ActiveRecord::Migration
  def change
    create_table :chapters do |t|
      t.references :deck, index: true

      t.timestamps
    end
  end
end
