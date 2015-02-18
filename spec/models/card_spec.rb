require 'spec_helper'

describe 'A card' do

  it 'saves with the default card_attributes values' do
    card = Card.new(card_attributes)

    expect(card.valid?).to be_true
  end

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

  it 'cannot be saved without a valid question and answer' do
    card = Card.new

    expect(card.valid?).to be_false
    expect(card.errors[:question]).to be_true
    expect(card.errors[:answer]).to be_true
  end

  it 'has a user attribute' do
    create_user
    card = Card.new(card_attributes)

    expect(card.user_id).to eq(@user.id)
  end

  describe 'after saving' do
    before(:each) do
      create_deck_and_card
    end

    it 'creates a most recent version with question and answer' do
      expect(@card.versions.count).to eq(1)
    end

    describe '#question' do
      it 'returns the most recent question' do
        expect(@card.question).to eq(@card.latest.question)
      end
    end

    describe '#answer' do
      it 'returns the most recent answer' do
        expect(@card.question).to eq(@card.latest.question)
      end
    end

    describe '#latest' do
      before(:each) do
        @card.update!(question: 'New Question, version 2', user_id: 1)
      end

      it 'returns the latest version of the card' do
        expect(@card.latest.question).to eq(@card.versions.last.question)
        expect(@card.latest.answer).to eq(@card.versions.last.answer)
      end
    end

    describe 'handling multiple iterations' do
      it 'versions match the amount of iterations' do
        @card.update!(question: 'Question 2', user_id: 2)
        @card.update!(question: 'Question 3', user_id: 3)
        @card.update!(question: 'Question 4', user_id: 4)
        @card.update!(question: 'Question 5', user_id: 5)

        expect(@card.versions.count).to eq(5)
        expect(@card.versions.third.user_id).to eq(3)
      end
    end
  end
end
