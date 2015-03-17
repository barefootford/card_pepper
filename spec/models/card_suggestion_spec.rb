require 'spec_helper'

describe CardSuggestion do
  let(:card_suggestion) { CardSuggestion.create!(card_attributes) }

  it { should_not be_valid }
  it { should be_pending }
  it { should belong_to :deck }
  it { should belong_to :user }

  it { should validate_presence_of :question }
  it { should validate_length_of(:question).is_at_least(2) }
  it { should validate_length_of(:question).is_at_most(140) }

  it { should validate_presence_of :answer }
  it { should validate_length_of(:answer).is_at_most(140) }
  it { should validate_length_of(:answer).is_at_least(2) }

  it { should respond_to(:user) }
  it { should respond_to(:status) }

  describe '.reject!' do
    subject { card_suggestion.reject! }
    it { should be_rejected }
  end

  describe '.approve!' do
    subject { card_suggestion.approve! }
    it { should be_approved }

    context 'parent decks card count' do
      let!(:deck)       { Deck.create!(deck_attributes) }
      let!(:approve_cs) { card_suggestion.approve! }

      subject { deck.cards.count }
      it { should be 1 }
    end
  end
end
