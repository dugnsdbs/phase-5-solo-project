class Activity < ApplicationRecord
  belongs_to :user
  belongs_to :list

  validates :location, presence: true
  validates :date, presence: true
  validates :time, presence: true, uniqueness: true
  validates :memo, presence: true
end
