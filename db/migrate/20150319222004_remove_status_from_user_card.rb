class RemoveStatusFromUserCard < ActiveRecord::Migration
  def change
    remove_column(:user_cards, :status)
  end
end
