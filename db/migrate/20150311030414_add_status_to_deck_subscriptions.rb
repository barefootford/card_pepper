class AddStatusToDeckSubscriptions < ActiveRecord::Migration
  def change
    add_column :deck_subscriptions, :status, :integer, default: 0
  end
end
