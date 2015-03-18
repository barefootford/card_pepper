class DeckSubscriptionsController < ApplicationController
  before_action :require_sign_in, only: [:create, :show, :update]
  before_action :set_deck_subscription, only: [:show, :update]

  def create
    @deck_subscription = current_user.deck_subscriptions.new(deck: set_deck)

    respond_to do |format|
      if @deck_subscription.save
        format.html { redirect_to @deck_subscription.deck, notice: 'We have added this to your study decks.' }
      else
        format.html { render action: 'new' }
      end
    end
  end

  def show
    @deck = @deck_subscription.deck
    @study_sessions_count = @deck_subscription.study_sessions.count
  end

  def update
    @deck = @deck_subscription.deck
    if set_deck_subscription_status == true
      respond_to do |format|
        format.js { render :update }
        format.html do redirect_to user_deck_subscription_path(current_user, @deck_subscription),
          notice: 'Deck subscription updated.'
        end
      end
    end
  end

private

  def set_deck_subscription_status
    case deck_subscription_params[:status]
    when 'paused'
      @deck_subscription.paused!
    when 'active'
      @deck_subscription.active!
    when 'archived'
      @deck_subscription.archived!
    end
  end

  def set_deck
    @deck ||= Deck.find(deck_subscription_params[:deck_id])
  end

  def set_deck_subscription
    @deck_subscription ||= current_user.deck_subscriptions.unscoped.find(deck_subscription_params[:id])
  end

  def deck_subscription_params
    params.permit(:id, :user_id, :deck_id, :status)
  end
end
