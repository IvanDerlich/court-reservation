require 'rails_helper'

RSpec.describe 'User', type: :model do
  let!(:user) { create :user }

  it 'Delete one court when the user is deleted' do
    court = Court.create(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator: user
    )
    expect(court.administrator).to be(user)
    expect(user.courts.first).to eq(court)
    expect(Court.exists?(court.id)).to be(true)
    user.destroy
    expect(Court.exists?(court.id)).to be(false)
    expect(User.exists?(user.id)).to be(false)
  end

  it 'Create courts through user' do
    user.courts.create(
      name: Faker::Name.name,
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence
    )
    expect(Court.first.administrator).to eq(user)
  end
end
