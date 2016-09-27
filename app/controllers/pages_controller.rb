class PagesController < ApplicationController

  def beta
  end

  def report_bug
  end

  def request_feature
  end

  def landing
    if current_user
      redirect_to dashboard_path
    end
    @user = User.new
  end
end
