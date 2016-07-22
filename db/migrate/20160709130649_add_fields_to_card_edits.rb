class AddFieldsToCardEdits < ActiveRecord::Migration
  def change
    add_column :card_edits, :reason, :text
    add_column :card_edits, :editor_response, :text
  end
end
