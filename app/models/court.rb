class Court < ApplicationRecord
  
  validates :administrator, presence: true
  belongs_to :administrator, class_name: :User

  validates :name, presence: true, length: { in: 1..40 }, uniqueness: true
  validates :address, presence: true, length: { in: 1..50 }
  validates :description, length: { maximum: 100 }

  has_many :bookings, dependent: :destroy
end
