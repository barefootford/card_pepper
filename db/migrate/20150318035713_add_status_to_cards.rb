class AddStatusToCards < ActiveRecord::Migration
  def change
    add_column :cards, :status, :integer, default: 0
  end
end
