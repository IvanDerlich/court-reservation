class User < ActiveRecord::Base
        before_save :format_input
        # extend Devise::Models
        # Include default devise modules        .
        devise  :database_authenticatable,                
                # :validatable,
                # :recoverable,
                :rememberable,
                # :trackable,             
                # :confirmable,
                # :omniauthable,
                :registerable
        
        # note that this include statement comes AFTER the devise block above
        include DeviseTokenAuth::Concerns::User
        validates :first_name, presence: true, length: { in: 1..20 }
        validates :last_name, presence: true, length: { in: 1..20 }
        validates :email, uniqueness: true
        validates_format_of :email, with: /@/
        validates :password, presence: true, length: { in: 8..20 }, :on => :create
        private

        def format_input
        self.first_name = first_name.downcase.titleize
        self.last_name = last_name.downcase.titleize
        self.email = email.downcase
        end
end
