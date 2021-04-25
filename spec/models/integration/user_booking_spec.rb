require 'rails_helper'

RSpec.describe User, type: :model do
  # delete one user and delete one or many bookings
  # show all the bookings a user has 
  let!(:user) {create :user}
  let!(:court) { create :court, :administrator => :user}
  let!(:booking1) { create :booking, :court => court}
  let!(:booking2) { create :booking, :court => court}
  let!(:booking3) { create :booking, :court => court}
  let!(:booking4) { create :booking, :court => court}
end