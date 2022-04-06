class ListSerializer < ActiveModel::Serializer
  attributes :id, :date

  has_many :users 
  has_many :activities 
end
