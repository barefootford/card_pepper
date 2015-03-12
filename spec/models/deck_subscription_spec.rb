require 'spec_helper'

describe 'A Deck Subscription' do
  before(:each) do
    @ds = DeckSubscription.new
  end

  it 'has a default scope of active' do
    create_user
    @user.deck_subscriptions.create!(deck_subscription_attributes)

    expect(@user.deck_subscriptions.count).to eq(1)
    expect(@user.deck_subscriptions.archived.count).to eq(0)
    expect(@user.deck_subscriptions.active.count).to eq(1)
  end

  it 'requires a user id' do
    expect(@ds.valid?).to eq(false)
    expect(@ds.errors[:user_id]).to be_present
  end

  it 'requires a deck id' do
    expect(@ds.valid?).to eq(false)
    expect(@ds.errors[:deck_id]).to be_present
  end

  it 'saves with deck_subscription_attributes' do
    @ds.assign_attributes(deck_subscription_attributes)

    expect(@ds.valid?).to be_true
    expect(@ds.active?).to be_true
  end

  it 'belongs to a user' do
    create_user
    @user.deck_subscriptions.create!(deck_subscription_attributes)

    expect(@user.deck_subscriptions.count).to eq(1)
  end
end