module SessionsHelper

  def not_owner_of(deck)
    deck.user != current_user
  end
end