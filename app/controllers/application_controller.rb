class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorized_user
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def current_user
    User.find_by(id: session[:_key])
  end


  def authorized_user
    return render json: {error: "Not Authorized"}, status: :unauthorized unless current_user
  end

  private
  
  def render_not_found_response
    render json: { error: "Not Found" }, status: :not_found
  end

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors.full_message}, status: :unprocessable_entity
  end



end
