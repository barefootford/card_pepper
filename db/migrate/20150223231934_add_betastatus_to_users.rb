class AddBetastatusToUsers < ActiveRecord::Migration
  def change
    add_column :users, :beta_status, :integer, default: 0
  end
end
