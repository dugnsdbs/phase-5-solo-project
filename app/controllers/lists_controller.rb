class ListsController < ApplicationController

  skip_before_action :authorized_user, only: [:destroy]

  def index 
    lists = List.all
    render json: lists, status: :ok
  end

  def show
    list = List.find(params[:id])
    render json: list
  end

  def create 
    list = List.create(list_params)
    # if list.valid?
    if current_user && list
      render json: list, status: :created
    else
      render json: { errors: list.errors.full_messages },
      status: :unprocessable_entity
    end
  end

  def update 
    list = List.find(params[:id])
    if current_user
      list.update(list_params)
      render json: list
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    head :no_content
  end

private 

  def list_params
    params.permit(:title)
  end

end
