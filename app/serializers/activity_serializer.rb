class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :location,:title,:time, :memo, :complete
  has_one :user
  has_one :list
end
