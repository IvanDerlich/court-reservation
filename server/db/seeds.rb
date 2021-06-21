# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Developer note:
# If you change this file you will have to also change the fron-end tests

require 'factory_bot_rails'

user = User.create!(
  email: 'ivan@ivan.com',
  password: '12345678',
  first_name: 'Ivan',
  last_name: 'Derlich'
)

10.times do 
  User.create!(
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end

10.times do
  Court.create!(
    name: Faker::Name.name,
    address: Faker::Address.street_address,
    description: Faker::Lorem.sentence,
    administrator: user
  )
end

5.times do
  Court.create!(
    name: Faker::Name.name,
    address: Faker::Address.street_address,
    description: Faker::Lorem.sentence,
    administrator_id: 2
  )
end

3.times do
  Court.create!(
    name: Faker::Name.name,
    address: Faker::Address.street_address,
    description: Faker::Lorem.sentence,
    administrator_id: 3
  )
end

def date
  year = rand(1990..2100)
  month = rand(1..12)
  day = if month == 2
          rand(1..28)
        elsif [4, 6, 9, 11].include? month
          rand(1..30)
        else
          rand(1..31)
        end
  hour = rand(0..23)
  DateTime.new(year, month, day, hour,
               0, # minutes
               0) # seconds
end

3.times do
  Booking.create!(
    booker: user,
    court: Court.create!(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator_id: 2
    ),
    description: Faker::Lorem.sentence,
    date: date
  )
end

4.times do
  Booking.create!(
    booker: user,
    court: Court.create!(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator_id: 3
    ),
    description: Faker::Lorem.sentence,
    date: date
  )
end

3.times do
  Booking.create!(
    booker_id: 2,
    court: Court.create!(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator: user,
    ),
    description: Faker::Lorem.sentence,
    date: date
  )
end

4.times do
  Booking.create!(
    booker_id: 3,
    court: Court.create!(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator: user,
    ),
    description: Faker::Lorem.sentence,
    date: date
  )
end
