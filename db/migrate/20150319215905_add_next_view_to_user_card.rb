class AddNextViewToUserCard < ActiveRecord::Migration
  def change
    add_column :user_cards, :next_view, :time

    change_column :user_cards, :last_view, :time
    change_column :user_cards, :first_view, :time
  end
end
