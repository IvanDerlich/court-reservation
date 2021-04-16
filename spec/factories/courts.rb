FactoryBot.define do
  factory :court do
    name { Faker::Lorem.characters(number:6) }
    address { Faker::Address.street_address  }
    description { Faker::Lorem.sentence }
    administrator { create(:user) }
  end
end
