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
      it 'Change date' do
        expect(Booking.all.first).to eq(booking)
        prev_date = booking.date
        booking.update(date: DateTime.new(
          Time.now.year , # year
          Time.now.month, # month
          rand(1..29), # day
          rand(19..23), # hour
          0, # minutes
          0 # seconds
        ))  
        expect(prev_date).not_to be(booking.date)
        expect(booking.valid?).to be(true)
      end
      it 'Change description', :focus do
        new_description = Faker::Lorem.characters(number:50)
        booking.update(description: new_description)
        expect(Booking.all.first.description).to eq(new_description)
      end
    end
    context 'Invalid update' do
      xit 'Change to an hour that is already taken' do
      end      
      xit 'Change court forbiden' do
      end
      xit 'Change booker forbiden' do
      end
      xit 'Remove court' do
      end
      xit 'Remove booker' do
      end
      xit 'Long description' do
      end
      xit 'Change date to a date already taken' do
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
