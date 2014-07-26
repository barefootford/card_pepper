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

    if filled_in_a_password? 
      update_password
    else
      update_profile
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
      notice: 'Account deleted. We promise not to text you anymore.'
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :website,
      :email, :password, :password_confirmation)
  end

  def password_params
    params.require(:user).permit(:password, :new_password, :new_password_confirmation)
  end

  def filled_in_a_password?
    return true if password_params[:password] || password_params[:new_password] || password_params[:new_password_confirmation]      
  end

  def require_correct_user
    redirect_to root_url unless current_user && (user == current_user)
  end

  def user
    @user ||= User.find(params[:id])    
  end

  def update_profile
    if @user.update(user_params)
      redirect_to @user, notice: 'Account updated.'
    else
      render :edit
    end
  end

  def password_is_wrong?
    return true if User.authenticate(@user.email, password_params[:password]) == false 
  end

  def update_password

    if password_is_wrong?
      @user.errors[:current_password] = 'is incorrect.'
    end

    if @user.update_password(password_params)
      redirect_to edit_user_path(@user), notice: "Password updated successfuly."
    else
      render :edit
    end
  end
end
