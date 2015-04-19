require 'spec_helper'

describe 'Attributes.rb' do
  describe '.create_user_deck_cards' do
    let!(:create_udc) { create_user_deck_cards }
    subject { create_udc }
    
    it { expect(Deck.count).to eq(1) }
    it { expect(User.count).to eq(1) }
    it { expect(Card.count).to eq(3) }
  end

  describe '.create_deck_subscription' do
    let!(:udc) { create_user_deck_cards }

    it do
      expect(DeckSubscription.count).to eq(0)
      expect(create_deck_subscription(User.first, Deck.first)).to be_instance_of(DeckSubscription)
      expect(DeckSubscription.count).to eq(1)
    end
  end

  describe '.create_cards_for' do
    let!(:user) { create_user }
    let!(:deck) { create_deck }

    it { expect { create_cards_for(Deck.last) }.to change(Card, :count).from(0).to(3) }
  end
end