FactoryBot.define do
  factory :booking do
    booker { create(:user) }
    court { create(:court) }
    # date { "2021-04-23 16:21:53" }
    date { DateTime.new(
      Time.now.year , # year
      Time.now.month, # month
      rand(1..29), # day
      rand(19..23), # hour
      0, # minutes
      0 # seconds
    )}
    description { Faker::Lorem.characters(number:15) }
  end
end
