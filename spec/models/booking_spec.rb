require 'rails_helper'

RSpec.describe Booking, type: :model do
  describe 'Creation' do
    let!(:user){ create :user }
    let!(:court) {create :court}
    context 'Valid Creation' do
      it 'Create a valid booking with a description' do        
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
      it 'Minutes are not zero'  do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,03,00)
        )  
        expect(booking.valid?).to be(false)
      end
      it 'Seconds are not zero'  do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,00,04)
        )  
        expect(booking.valid?).to be(false)
      end
      it 'There is no booker' do
        booking = Booking.create(
          booker: user,
          date: DateTime.new(2021,05,02,16,0,0)
        )     
        expect(booking.valid?).to be(false)
      end
      it 'There is no court' do
        booking = Booking.create(
          booker: user,
          date: DateTime.new(2021,05,02,16,0,0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'Combination of datetime and court already taken' do
        Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,0,0)
        )
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,0,0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'Long description' do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021,05,02,16,0,0),
          description: Faker::Lorem.characters(number:101)          
        )
        expect(booking.valid?).to be(false)
      end
    end
  end
  describe 'Update' do
    let!(:booking){ 
      create :booking      
    }
    context 'Valid update' do
      it 'Change hour', :focus do
        expect(Booking.all.first).to eq(booking)
        # p "Day"
        # p Time.now.day
        # p create(:booking)
      end
    end
    context 'Invalid update' do
      xit 'Change to an hour that is already taken' do
      end
      xit 'Remove court' do
      end
      xit 'Remove booker' do
      end
      xit 'Long description' do
      end
    end    
  end
  describe 'Delete' do
    xit 'Record Exists' do
    end
    xit 'Record doesn/t exist' do
    end
  end
end
