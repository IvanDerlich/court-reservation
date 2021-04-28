# require '../support/request_spec_helper.rb'

FactoryBot.define do
  factory :booking do
    booker { create(:user) }
    court { create(:court) }
    date do
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
    description { Faker::Lorem.characters(number: 15) }
  end
end
