class UsersController < ApplicationController
skip_before_action: authorized_user, only: [:create, :index]

  def index 
    render json: User.all
  end

  def show 
    if current_user
      render json: current_user, status: :ok 
    else
      render json: "No current User", status: :unauthorized
    end
  end

  def create 
    user = User.create(user_params)
    if user
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


private

def user_params
  params.permit(:username, :password, :password_confirmation, :name, :email, :photo)
end


end
