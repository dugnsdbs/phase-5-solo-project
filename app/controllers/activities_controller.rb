class ActivitiesController < ApplicationController
 
  skip_before_action :authorized_user, only: [:destroy]

  def index 
    activities = Activity.all
    render json: activities, status: :ok
  end

  def show
    activity = Activity.find(params[:id])
    render json: activity
  end

  def create 
    activity = Activity.create(activity_params)
    if current_user && activity
      render json: activity, status: :created
    else
      render json: { errors: activity.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  def update 
    activity = Activity.find(params[:id])
    if activity.update(activity_params)
      render json: activity
    else
      render json: activity.errors
    end
  end

  def destroy
    activity = Activity.find(params[:id])
    activity.destroy
    head :no_content
  end

private 

  def activity_params
    params.permit(:user_id, :list_id, :location, :date, :endDate,:time, :memo, :complete)
  end

end
