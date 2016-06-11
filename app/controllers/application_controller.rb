class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :current_user

private
  def must_be_beta_approved
    if current_user
      notice = "We hope to include more people in the Card Pepper beta as soon as possible. Watch your email for when you're in."
    else 
      notice = "You'll need to first sign in to do that."
    end

    redirect_to beta_path, notice: notice unless (current_user && current_user.approved?)
  end

  def destroy_session
    cookies.signed[:user_id] = nil
  end

  def not_permitted
    destroy_session
    redirect_to sign_up_path, notice: "Only the creator can edit the deck."
  end

  def current_user_owns(object)
    current_user && (current_user == object.user)
  end

  def current_user
    @current_user ||= User.find(cookies.signed[:user_id]) if cookies.signed[:user_id].present?
  end

  def require_sign_in
    unless current_user.present?
      session[:intended_url] = request.url
      redirect_to sign_up_path, alert: 'Card Pepper is free, but only registered users can do that.'
    end
  end

  # makes these controller methods available inside views
  helper_method :current_user, :destroy_session, :deck_id, :current_user_owns, :must_be_beta_approved
end