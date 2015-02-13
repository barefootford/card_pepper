class SessionsController < ApplicationController

  def new
    respond_to do |format|
      format.html do
        if current_user
          redirect_to root_url,
          notice: "#{current_user.name} is already signed in. Not you? Click 'Sign Out.'"
        end
      end

      format.js { render :new }
    end
  end

  def create
    user = User.find_by(email: params[:email])

    if user = User.authenticate(params[:email], params[:password])
      session[:user_id] = user.id
      flash[:notice] = "Welcome back, #{user.name}."
      redirect_to(session[:intended_url] || user)
      session[:intended_url] = nil
    else
      flash.now[:alert] = 'Invalid email/password combination'
      render :new
    end 
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "You're signed out."
  end
end