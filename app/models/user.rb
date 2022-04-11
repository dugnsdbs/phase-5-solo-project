class User < ApplicationRecord
  has_many :activities, dependent: :destroy 
  has_many :lists, through: :activities
  has_many :weathers
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :photo, presence: true
  validates :city, presence: true

  # def user_city
  #   @current_city = self.find(:city)
  # end

end

