class WeathersController < ApplicationController

  require 'rest-client'

  def get_weather

    url ="https://www.metaweather.com/api/location/44418"
    response = RestClient.get(url)
    render json: response
  end


end
