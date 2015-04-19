class StudySession < ActiveRecord::Base
  belongs_to :deck_subscription
  belongs_to :deck
  has_many   :to_dos

  validates :deck_subscription_id, presence: true
  validates :deck_id, presence: true

  def next_card
    @next_card ||= self.to_dos.sample.user_card
  end

  def cards_remain?
    self.to_dos.any?
  end

  def add_to_dos
    deck_subscription.user_cards_to_study.each do |uc|
      self.to_dos.new(user_card_id: uc.id, study_session_id: self.id )
    end

    self.save
  end
end
