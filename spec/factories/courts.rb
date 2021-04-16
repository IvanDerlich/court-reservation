FactoryBot.define do
  factory :court do
    name { Faker::Lorem.words(4) }
    address { Faker::Address.street_address  }
    description { Faker::Lorem.sentences(1, true) }
    administrator { create(:user) }
  end
end
