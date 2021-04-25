class Booking < ApplicationRecord  

  validates :booker, presence: true
  belongs_to :booker, class_name: :User

  validates :court, presence: true  
  belongs_to :court

  validates :description, length: { maximum: 100 }
  
  validates_uniqueness_of :booker, :scope => :court
end
