require 'rails_helper'

RSpec.describe Court, type: :model do
  let!(:court) { create :court }
  let!(:booking) { create :booking, court: court }

  it 'Show all the bookings the court has' do
    expect(court.bookings.size).to eq(1)
    expect(court.bookings.first).to eq(booking)
  end

  it 'Delete a court and delete one or many bookings' do
    court.destroy
    expect(Booking.exists?(booking.id)).to be(false)
  end
end
