class List < ApplicationRecord
  has_many :activities, dependent: :destroy 
  has_many :users, through: :activities
end
