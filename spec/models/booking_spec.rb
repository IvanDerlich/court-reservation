require 'rails_helper'

RSpec.describe Booking, type: :model do
  describe 'Creation' do
    let!(:user){ create :user }
    let!(:court) {create :court}
    context 'Valid Creation' do
      it 'Create a valid booking with a description', :focus do        
        booking = Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,0,0),
          description: Faker::Lorem.characters(number:30)
        )     
        expect(Booking.all.first).to eq(booking) 
      end
      it 'Create a valid booking with no description' do
        booking = Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,0,0)
        )     
        expect(Booking.all.first).to eq(booking)
      end
    end
    context 'Invalid Creation' do
      it 'Minutes and seconds are not zero' do
      end
      it 'There is no booker' do
      end
      it 'There is no court' do
      end
      it 'Datetime and court already taken' do
      end
    end
  end
end
