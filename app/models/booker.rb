class Booker < ApplicationRecord
  belongs_to :booker, class_name: :User, presence: true
  belongs_to :court, presence: true
  validates :description, length: { maximum: 100 }

  # validates_uniqueness_of :user, :scope => :court
end
