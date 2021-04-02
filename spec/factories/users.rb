FactoryBot.define do
  password = Faker::Internet.password(8)
  factory :user do
    email {Faker::Internet.email}
    password {password}
  end
end
