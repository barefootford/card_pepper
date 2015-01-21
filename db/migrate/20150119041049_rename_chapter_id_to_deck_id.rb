class RenameChapterIdToDeckId < ActiveRecord::Migration
  def change
		rename_column(:cards, :chapter_id, :deck_id)
  end
end

# class RenameNameToFirstName < ActiveRecord::Migration
#   def change
#     rename_column(:users, :name, :first_name)
#     add_column(:users, :last_name, :string)
#   end
# end