class WeatherSerializer < ActiveModel::Serializer
  attributes :id
  has_one :activity
end
