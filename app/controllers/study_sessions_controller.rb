class StudySessionsController < ApplicationController
  before_action :require_sign_in
  before_action :must_be_beta_approved
  before_action :set_deck_subscription

  before_action :set_user_card, only: [:update]
  before_action :set_study_session, only: [:show, :update]
  before_action :sync_deck_subscription, only: [:create]
  before_action :does_deck_need_studying?, only: [:create]

  def create
    @study_session = @deck_subscription.study_sessions.create!(deck_id: @deck_subscription.deck_id)
    @study_session.add_to_dos

    if @study_session.save
      redirect_to deck_subscription_study_session_path(@deck_subscription, @study_session)
    else
      raise StandardError
    end
  end

  def show
    if @study_session.to_dos.any?
      set_user_card_and_card
    else
      redirect_to dashboard_path, status: 303, notice: 'Study Session over. All cards learned.'
    end
  end

  def update
    if @user_card.deck_subscription.user_id != current_user.id
      not_permitted
    else
      update_user_card
      remove_user_card_from_study_session if study_session_params[:user_response] == 'got-it'
      set_user_card_and_card if @study_session.to_dos.any?

      respond_to do |format|
        format.js
      end
    end
  end

private
  def does_deck_need_studying?
    redirect_to dashboard_path, status: 303, notice: 'No more cards to study in this deck. Study another deck or come back tomorrow.' unless @deck_subscription.needs_studying?
  end
  
  def remove_user_card_from_study_session
    @study_session.to_dos.where(user_card_id: @user_card.id).first.destroy
    @study_session.save!
  end

  def set_user_card
    @user_card = UserCard.includes(:deck_subscription).find(study_session_params[:user_card_id])
  end

  def set_user_card_and_card
    @user_card = @study_session.next_card
    @card = @user_card.card
  end

  def update_user_card
    @user_card.update_with(study_session_params[:user_response])
  end

  def set_study_session
    @study_session ||= StudySession.find(study_session_params[:id])
  end

  def sync_deck_subscription
    set_deck_subscription.sync
  end

  def set_deck_subscription
    @deck_subscription ||= DeckSubscription.find(study_session_params[:deck_subscription_id])
  end

  def study_session_params
    params.permit(:id, :deck_subscription_id, :user_response, :user_card_id)
  end
end
