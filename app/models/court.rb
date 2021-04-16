class Court < ApplicationRecord
  belongs_to :administrator, class_name: :User
  validates :name, presence: true, length: { in: 1..40 }, uniqueness: true
  validates :address, presence: true, length: { in: 1..50 }
  validates :description, presence: true, length: { in: 1..100 }
  validates :description, presence: true, length: { in: 1..100 }

end
