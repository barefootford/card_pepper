class AddChapterIdToCards < ActiveRecord::Migration
  def change
    add_reference :cards, :chapter, index: true
  end
end
