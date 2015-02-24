class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :current_user

private

  def must_be_beta_approved
    redirect_to beta_path unless (current_user && current_user.approved?)
  end

  def destroy_session
    session[:user_id] = nil
  end
  
  def users_match?(object1, object2)
    object1 == object2
  end

  def not_permitted
    destroy_session
    redirect_to sign_up_path, notice: "Only the creator can edit the deck."
  end

  def require_creator
    unless Deck.find(params[:id]).user == current_user
      not_permitted
    end
  end

  def current_user_owns(object)
    current_user && (current_user == object.user)
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_sign_in
    unless current_user.present?
      session[:intended_url] = request.url
      redirect_to sign_up_path, alert: 'Card Pepper is free, but only registered users can do that.'
    end
  end

  helper_method :current_user, :destroy_session, :deck_id, :current_user_owns, :require_creator, :must_be_beta_approved
end