class Booking < ApplicationRecord  

  attr_readonly :booker 
  attr_readonly :court

  validates :booker, presence: true
  belongs_to :booker, class_name: :User

  validates :court, presence: true
  belongs_to :court

  validate :o_clock_time?

  validate :booker_read_only, :on => :update

  validate :court_read_only, :on => :update

  validates :description, length: { maximum: 100 }
  
  validates_uniqueness_of :court, :scope => :date

  private

  def o_clock_time?
    if (date.min != 0)
      errors.add(:date, "Date can't have minutes different from zero")
    elsif (date.sec != 0)
      errors.add(:date, "Date can't have seconds different from zero")
    elsif (date.usec != 0)
      errors.add(:date, "Date can't have miliseconds different from zero")
    end
  end

  def court_read_only
    if self.court_id_changed?
      errors.add(:court,"Can't change court")
    end
  end

  def booker_read_only
    if self.booker_id_changed?
      errors.add(:booker,"Can't change booking")
    end
  end


end
