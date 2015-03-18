class StudySessionsController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved
  before_action :set_deck_subscription, only: [:create]

  def create
    @study_session = @deck_subscription.study_sessions.new(deck_id: @deck_subscription.deck_id)
    if @study_session.save
      redirect_to study_session_path(@study_session)
    else
      redirect_to root_url
    end
  end

  def show
  end

private
  def set_deck_subscription
    @deck_subscription ||= current_user.deck_subscriptions.find(study_session_params[:deck_subscription_id])
  end

  def study_session_params
    params.permit(:deck_subscription_id)
  end
end


  # def create
  #   @new_deck = current_user.decks.new(deck_params)
  #   if @new_deck.save
  #      redirect_to edit_deck_path(@new_deck), notice: "Deck built successfully."
  #   else
  #     render :new
  #   end
  # end