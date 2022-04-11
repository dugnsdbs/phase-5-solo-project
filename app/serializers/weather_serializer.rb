class WeatherSerializer < ActiveModel::Serializer
  attributes :id
  has_one :activity
  has_one :user
end
