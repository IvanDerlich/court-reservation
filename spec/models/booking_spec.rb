require 'rails_helper'

RSpec.describe Booking, type: :model do
  describe 'Creation' do
    let!(:user) { create :user }
    let!(:court) { create :court }
    context 'Valid Creation' do
      it 'Create a valid booking with a description' do
        booking = Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0),
          description: Faker::Lorem.characters(number: 30)
        )
        expect(Booking.all.first).to eq(booking)
      end
      it 'Create a valid booking with no description' do
        booking = Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        expect(Booking.all.first).to eq(booking)
      end
    end
    # rubocop:disable Metrics/BlockLength
    context 'Invalid Creation' do
      it 'Minutes are not zero' do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0o3, 0o0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'Seconds are not zero' do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0o0, 0o4)
        )
        expect(booking.valid?).to be(false)
      end
      it 'There is no booker' do
        booking = Booking.create(
          booker: user,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'There is no court' do
        booking = Booking.create(
          booker: user,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'Combination of datetime and court already taken' do
        Booking.create!(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        expect(booking.valid?).to be(false)
      end
      it 'Long description' do
        booking = Booking.create(
          booker: user,
          court: court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0),
          description: Faker::Lorem.characters(number: 101)
        )
        expect(booking.valid?).to be(false)
      end
    end
    # rubocop:enable Metrics/BlockLength
  end
  describe 'Update' do
    let!(:booking) { create :booking }
    let!(:court) { create :court }
    let!(:user) { create :user }
    context 'Valid update' do
      it 'Change date' do
        expect(Booking.all.first).to eq(booking)
        prev_date = booking.date
        booking.update(date: DateTime.new(
          Time.now.year, # year
          Time.now.month, # month
          rand(1..29), # day
          rand(19..23), # hour
          0, # minutes
          0 # seconds
        ))
        expect(prev_date).not_to be(booking.date)
        expect(booking.valid?).to be(true)
      end
      it 'Change description' do
        new_description = Faker::Lorem.characters(number: 50)
        booking.update(description: new_description)
        expect(Booking.all.first.description).to eq(new_description)
      end
    end
    context 'Invalid update' do
      it 'Change to an date and court that is already taken' do
        booking2 = Booking.create(
          booker: user,
          court: booking.court,
          date: DateTime.new(2021, 0o5, 0o2, 16, 0, 0)
        )
        expect(booking.update(date: booking2.date)).to eq(false)
      end
      it 'Change court forbiden' do
        expect(booking.update(court: court)).to eq(false)
      end
      it 'Change booker forbiden' do
        expect(booking.update(booker: user)).to eq(false)
      end
      it 'Remove court' do
        expect(booking.update(court: nil)).to eq(false)
      end
      it 'Remove booker' do
        expect(booking.update(booker: nil)).to eq(false)
      end
      it 'Long description' do
        expect(
          booking.update(
            description: Faker::Lorem.characters(number: 101)
          )
        ).to eq(false)
      end
    end
  end
  describe 'Delete' do
    let!(:booking) { create :booking }
    it 'Record Exists' do
      expect(booking.destroy).to eq(booking)
    end
  end
end
