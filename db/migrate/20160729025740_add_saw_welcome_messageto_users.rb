class AddSawWelcomeMessagetoUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_saw_welcome_message, :boolean
  end
end
