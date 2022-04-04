class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :photo, presence: true

end

