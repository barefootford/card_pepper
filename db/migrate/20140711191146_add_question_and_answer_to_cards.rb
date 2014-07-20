class AddQuestionAndAnswerToCards < ActiveRecord::Migration
  def change
    add_column :cards, :question, :string
    add_column :cards, :answer, :string
  end
end
