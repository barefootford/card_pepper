require 'spec_helper'

describe 'A Card' do 

  it 'cannot be saved with a parent chapter' do
    card = Card.new
    expect(card.valid?).to be_false
    expect(card.errors[:chapter_id].any?).to be_true
  end

  it 'can be saved without a parent chapter' do 
    card = Card.new(chapter_id: 1)
    card.valid?
    expect(card.errors[:chapter_id].any?).to be_false
  end
  

  it 'can be saved with a valid question and answer'
  it 'cannot be saved without a valid or answer question'

end

# it "requires a name" do
#     user = User.new(name: "")

#     expect(user.valid?).to be_false
#     expect(user.errors[:name].any?).to be_true
#   end