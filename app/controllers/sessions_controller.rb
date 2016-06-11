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
    if user = User.authenticate(params[:email], params[:password])
      cookies.signed[:user_id] = { value: user.id, expires: 6.months.from_now }

      flash[:notice] = "Welcome back, #{user.name}."
      redirect_to(session[:intended_url] || dashboard_path )
      session[:intended_url] = nil
    else
      flash.now[:alert] = 'Invalid email/password combination'
      render :new
    end
  end

  def destroy
    cookies.signed[:user_id] = nil
    redirect_to sign_in_path, notice: "You're signed out."
  end
end