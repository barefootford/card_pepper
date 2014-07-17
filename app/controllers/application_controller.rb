class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

private
  
  def destroy_session
    session[:user_id] = nil    
  end
  
  def require_creator
    unless Deck.find(params[:id]).user == current_user
      redirect_to root_url,
      notice: "Only the creator can edit the deck."
    end 
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]  
  end

  def require_sign_in
    unless current_user
      session[:intended_url] = request.url
      redirect_to sign_up_path, alert: 'Card Pepper is free, but only registered users can see decks. Please sign in or sign up.'
    end
  end

  helper_method :current_user, :destroy_session
end