require 'spec_helper'

describe 'A deck' do
  it 'will not save without a title' do 
    deck = Deck.new(title:"")

    expect(deck.valid?).to be_false
    expect(deck.errors[:title].any?).to be_true
  end 
  
  it 'requires a creator' do 
    deck = Deck.new(user_id: nil)

    expect(deck.valid?).to be_false
    expect(deck.errors[:user_id].any?).to be_true
  end

  it 'is valid with the demo attributes' do
    deck = Deck.new(deck_attributes)
    deck.user_id = 1
    expect(deck.valid?).to be_true
  end
end