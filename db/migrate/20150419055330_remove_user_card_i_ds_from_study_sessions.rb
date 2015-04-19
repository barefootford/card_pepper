class RemoveUserCardIDsFromStudySessions < ActiveRecord::Migration
  def change
    remove_column(:study_sessions, :user_card_ids)
  end
end
