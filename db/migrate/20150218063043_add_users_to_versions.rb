class AddUsersToVersions < ActiveRecord::Migration
  def change
    add_reference :versions, :user, index: true
  end
end
