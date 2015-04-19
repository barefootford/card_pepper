class CreateToDos < ActiveRecord::Migration
  def change
    create_table :to_dos do |t|
      t.references :study_session, index: true
      t.references :user_card, index: true

      t.timestamps
    end
  end
end
