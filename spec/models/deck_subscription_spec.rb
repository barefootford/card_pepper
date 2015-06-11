require 'spec_helper'

describe DeckSubscription do

  let!(:user)  { User.create!(user_attributes) }
  let!(:deck)  { create_deck }
  let!(:cards) { create_cards_for(deck) }
  let!(:ds)    { DeckSubscription.create!(deck_subscription_attributes) }

  it { should validate_presence_of :user_id }
  it { should belong_to :user }
  it { should have_many :user_cards }

  it { should validate_presence_of :deck_id }
  it { should belong_to :deck }

  it { should have_many :study_sessions }

  it 'has a default scope of active' do
    expect(ds).to be_active
    expect(DeckSubscription.inactive).not_to include(ds)
  end

  it '.sorted_user_cards' do
    ds.sync
    expect(deck.cards.count).to eq(3)
    expect(ds.user_cards.count).to eq(3)
  end

  it '.needs_studying_on' do 
    # expect(ds.needs_studying_on).to be_instance_of(DateTime)
    # expect(ds.needs_studying_on.year).to be (2014) 
  end
end