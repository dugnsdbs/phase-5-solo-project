class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :email, :photo, :city

  has_many :lists 
  has_many :activities
  has_many :weathers
end
