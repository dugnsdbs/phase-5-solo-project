class User < ApplicationRecord
  has_many :activities, dependent: :destroy 
  has_many :lists, through: :activities
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :photo, presence: true

end

