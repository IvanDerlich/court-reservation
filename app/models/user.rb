class User < ActiveRecord::Base
        before_save :format_input
        # extend Devise::Models
        # Include default devise modules        .
        devise  :database_authenticatable,                
                # :validatable,
                # :recoverable,
                # :rememberable,
                # :trackable,             
                # :confirmable,
                # :omniauthable,
                :registerable
        
        # note that this include statement comes AFTER the devise block above
        include DeviseTokenAuth::Concerns::User
        validates :name, presence: true, length: { in: 4..20 }
        #   validates :email, uniqueness: true
        #   validates_format_of :email, with: /@/
        #   validates :password_digest, presence: true  
        private

        def format_input
        self.name = name.downcase.titleize
        self.email = email.downcase
        end
end
