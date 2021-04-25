class Booking < ApplicationRecord  

  validates :booker, presence: true
  belongs_to :booker, class_name: :User

  validates :court, presence: true  
  belongs_to :court

  validate :o_clock_time?

  validates :description, length: { maximum: 100 }
  
  validates_uniqueness_of :booker, :scope => :court

  private

  def o_clock_time?
    if (date.min != 0)
      errors.add(:date, "date can't have minutes different from zero")
    elsif (date.sec != 0)
      errors.add(:date, "date can't have seconds different from zero")
    elsif (date.usec != 0)
      errors.add(:date, "date can't have miliseconds different from zero")
    end
  end
end
