FactoryBot.define do
  factory :booking do
    booker { create(:user) }
    court { create(:court) }
    date { 
      year = rand(1990..2100)
      month = rand(1..12)
      if month == 2
        day = rand(1..28)            
      elsif([4,6,9,11].include? month)            
        day = rand(1..30)
      else
        day = rand(1..31)
      end         
      hour = rand(0..23)
      DateTime.new(year,month,day,hour,
        0, # minutes
        0 # seconds            
      )
  }
    description { Faker::Lorem.characters(number:15) }
  end
end
