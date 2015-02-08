class Api::UsersController < ApplicationController
  def show
    @user = User.includes(:galleries).find(params[:id])
    render :show
  end
end
