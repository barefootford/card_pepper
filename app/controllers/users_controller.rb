class UsersController < ApplicationController

  before_action :require_correct_user, only: [:edit, :update, :delete, :destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)    
    if @user.save
      session[:user_id] = @user.id
      redirect_to decks_path,
      notice: "Thanks for signing up!"
    else
      render :new
    end
  end

  def edit
    @user = user
  end

  def update
    @user = user
    if @user.update(user_params)
      redirect_to @user, notice: 'Account updated.'
    else
      render :edit
    end
  end

  def delete
    @user = user
  end

  def show
    @user = User.find(params[:id])
  end

  def destroy
    @user.destroy
    destroy_session
    redirect_to root_url,
      notice: 'We enjoyed the time we had. We hope you sign up again.'
  end

  private

  def require_correct_user
    redirect_to root_url unless user == current_user    
  end

  def user
    @user ||= User.find(params[:id])    
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :website,
      :email, :password, :password_confirmation)
  end
end
