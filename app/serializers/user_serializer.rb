class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :email, :photo

  has_many :lists 
  has_many :activities
end
