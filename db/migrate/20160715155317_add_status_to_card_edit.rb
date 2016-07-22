class AddStatusToCardEdit < ActiveRecord::Migration
  def change
    add_column :card_edits, :status, :integer, :default => 0
  end
end
