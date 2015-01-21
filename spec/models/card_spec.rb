require 'spec_helper'

describe 'A card' do

  it 'cannot be saved without a parent deck' do
    card = Card.new
    expect(card.valid?).to be_false
    expect(card.errors[:deck_id].any?).to be_true
  end

  it 'saves with a parent deck' do
    card = Card.new(deck_id: 1)
    card.valid?
    expect(card.errors[:deck_id].any?).to be_false
  end

  it 'saves with a valid question and answer' do
    card = Card.new(question: question, answer: answer, deck_id: 1)
    expect(card.errors[:answer].any?).to be_false
    expect(card.errors[:question].any?).to be_false
    expect(card.valid?).to be_true
  end

  it 'cannot be saved without a valid question and answer' do
    card = Card.new
    expect(card.valid?).to be_false
    expect(card.errors[:question]).to be_true
    expect(card.errors[:answer]).to be_true
  end

  it 'has a user attribute' do
    create_user
    create_deck
    create_card

    expect(@card.user).to eq(@user)
  end
end