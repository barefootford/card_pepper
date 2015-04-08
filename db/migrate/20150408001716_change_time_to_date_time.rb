class ChangeTimeToDateTime < ActiveRecord::Migration
  def change
    remove_column(:user_cards, :last_view)
    remove_column(:user_cards, :first_view)
    remove_column(:user_cards, :next_view)

    add_column(:user_cards, :last_view, :datetime)
    add_column(:user_cards, :first_view, :datetime)
    add_column(:user_cards, :next_view, :datetime)
  end
end