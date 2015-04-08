class AddUseridToStudySession < ActiveRecord::Migration
  def change
    add_column :study_sessions, :user_card_ids, :text, array:true, default: []
  end
end
