require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:user) { create :user }
  # let!(:court) { create :court, :administrator => user}
  let!(:booking) { create :booking, booker: user }

  it 'Show all the bookings the user has as booker' do
    expect(user.bookings.size).to eq(1)
    expect(user.bookings.first).to eq(booking)
  end

  it 'Delete a user and delete one or many bookings' do
    user.destroy
    expect(Booking.exists?(booking.id)).to be(false)
  end
end
