class WeathersController < ApplicationController

  require 'rest-client'

  def get_weather

    url ="https://www.metaweather.com/api/location/search/?query=new york"
    response = RestClient.get(url)
    render json: response
  end


end
