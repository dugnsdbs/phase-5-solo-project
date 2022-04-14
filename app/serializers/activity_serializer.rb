class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :location, :date,:endDate,:time, :memo, :complete
  has_one :user
  has_one :list
end
