require 'spec_helper'

describe Card do
  let(:card_with_attributes) { Card.new(card_attributes) }

  it { should_not be_valid }

  it { should validate_presence_of :deck_id }
  it { should belong_to :deck }

  it { should belong_to :user }
  it { should validate_presence_of :user_id }

  it { should validate_presence_of :question }
  it { should validate_length_of(:question).is_at_least(2) }
  it { should validate_length_of(:question).is_at_most(140) }

  it { should validate_presence_of :answer }
  it { should validate_length_of(:answer).is_at_most(140) }
  it { should validate_length_of(:answer).is_at_least(2) }

  context 'a card with card_attributes' do
    it { expect(card_with_attributes).to be_valid }
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
