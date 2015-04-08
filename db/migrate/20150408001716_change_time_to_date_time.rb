class ChangeTimeToDateTime < ActiveRecord::Migration
  def change
    change_column(:user_cards, :last_view, :datetime)
    change_column(:user_cards, :first_view, :datetime)
    change_column(:user_cards, :next_view, :datetime)
  end
end