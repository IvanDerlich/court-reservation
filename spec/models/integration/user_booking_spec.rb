require 'rails_helper'

RSpec.describe User, type: :model do
  # delete one user and delete one or many bookings
  # show all the bookings a user has 
  let!(:user) {create :user}
  let!(:court) { create :court, :administrator => user}
  let!(:booking1) { create :booking, :court => court}
  let!(:booking2) { create :booking, :court => court}
  let!(:booking3) { create :booking, :court => court}
  let!(:booking4) { create :booking, :court => court}

  it 'Show all the bookings the user has' do
    expect(user.bookings.size).to eq(4)
    expect(user.bookings.first).to eq(booking1)
    expect(user.bookings.second).to eq(booking2)
  end

  it 'Delete a user and delete one or many bookings' do
    user.destroy    
    expect(Booking.exists?(booking1.id)).to be(false)
    expect(Booking.exists?(booking2.id)).to be(false)
    expect(Booking.exists?(booking3.id)).to be(false)
    expect(Booking.exists?(booking4.id)).to be(false)
  end
end