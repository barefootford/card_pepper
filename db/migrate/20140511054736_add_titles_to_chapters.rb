class AddTitlesToChapters < ActiveRecord::Migration
  def change
    add_column :chapters, :title, :string
  end
end
