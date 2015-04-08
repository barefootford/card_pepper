require 'spec_helper'

describe UserCard do

  it { should belong_to :deck_subscription }
  it { should belong_to :card }
  it { should_not be_valid }
  it { should validate_presence_of :deck_subscription_id }
  it { should validate_presence_of :card_id }

  context 'with a valid Card and new UserCard' do
    let(:card) { Card.create!(card_attributes) }
    let(:user_card) { card.user_cards.create!(deck_subscription_id: 1) }

    it { expect(user_card.next_view).to be_nil }
    it { expect(user_card.last_view).to be_nil }
    it { expect(user_card.first_view).to be_nil }
    it { expect(user_card.view_count).to be_nil }

    describe '.active?' do
      subject { user_card.active? }
      it { should be_true }
    end

    describe '.answer' do
      subject { user_card.answer }
      it { should eq(card_attributes[:answer]) }
    end

    describe '.increased_efficiency' do
      subject { user_card.increased_efficiency }
      it { should eq(1.7) }
    end

    describe '.needs_studying?' do
      subject { user_card.needs_studying? }
      it { should be_true }
    end

    describe '.never_viewed?' do
      subject { user_card.never_viewed? }
      it { should be_true }
    end

    describe '.now' do
      subject { user_card.now }
      it { should be_instance_of(DateTime) }
      it { expect(subject.to_f).to be > DateTime.new.to_f - 1.hour.seconds }
    end

    describe '.time_gap' do
    #   subject { user_card.now_plus_time_gap }
    #   it { should be_instance_of(DateTime) }
    #   it { expect(subject.to_f).to be >(DateTime.new.to_f + 11.hours.seconds) }
    end

    describe '.question' do
      subject { user_card.question }
      it { should eq card_attributes[:question] }
    end

    describe '.update_for_correct_response' do
      subject { user_card.update_for_correct_response; user_card }
      it { expect(subject.needs_studying?).to be_false }
      it { expect(subject.first_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.last_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.next_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.next_view.to_f).to be >(user_card.now.to_f + 11.hours.seconds) }
      it { expect(subject.view_count).to be 1 }
    end

    describe '.update_for_incorrect_response' do
      subject { user_card.update_for_incorrect_response; user_card }

      it { puts "subject.next_view: #{subject.next_view}" }
      it { expect(subject.needs_studying?).to be_true }
      it { expect(subject.first_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.last_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.next_view).to be_instance_of(ActiveSupport::TimeWithZone) }
      it { expect(subject.next_view.to_f).to be <(user_card.now.to_f + 15.minutes.seconds) }
      it { expect(subject.view_count).to be 1 }
    end

    describe '.update_with' do
      context 'with got-it response' do
        subject { user_card.update_with('got-it') }
        it { should be_true }
      end

      context 'with again response' do
        subject { user_card.update_with('again') }
        it { should be_true }
      end

      context 'with an improper response' do
        it { expect { user_card.update_with('garbaly gook') }.to raise_error(StandardError) }
      end
    end
  end
end
