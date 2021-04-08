class User < ApplicationRecord
        # Include default devise modules.
        devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :trackable, :validatable,
                :confirmable#, :omniauthable
        include DeviseTokenAuth::Concerns::User
        #   validates :email, uniqueness: true
        #   validates_format_of :email, with: /@/
        #   validates :password_digest, presence: true  
end
