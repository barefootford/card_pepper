require 'spec_helper'

describe DeckSubscription do
  let(:user) { User.create!(user_attributes) }
  let(:ds)   { DeckSubscription.create!(deck_subscription_attributes) }

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
end