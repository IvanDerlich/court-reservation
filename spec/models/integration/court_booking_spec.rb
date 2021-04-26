require 'rails_helper'

RSpec.describe Court, type: :model do  
  let!(:court) { create :court}
  let!(:booking1) { create :booking, :court => court}
  let!(:booking2) { create :booking, :court => court}
  let!(:booking3) { create :booking, :court => court}
  let!(:booking4) { create :booking, :court => court}

  it 'Show all the bookings the court has' do
    expect(court.bookings.size).to eq(4)
    expect(court.bookings.first).to eq(booking1)
    expect(court.bookings.second).to eq(booking2)
  end

  it 'Delete a court and delete one or many bookings' do
    court.destroy    
    expect(Booking.exists?(booking1.id)).to be(false)
    expect(Booking.exists?(booking2.id)).to be(false)
    expect(Booking.exists?(booking3.id)).to be(false)
    expect(Booking.exists?(booking4.id)).to be(false)
  end
end