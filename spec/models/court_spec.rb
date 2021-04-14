require 'rails_helper'

RSpec.describe Court, type: :model do

  describe 'Court Creation' do
    
    let(:user){ create :user } 
    it 'create one court' do      
      court = Court.create(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentences(1, true),
        administrator: user
      )
      expect(court.valid?).to be(true)   
    end
    it 'Delete court' do
      
    end    
  end
  describe 'Court edit' do
    it 'Edit name' do
      
    end
    it 'Edit name to another that has the same name' do
      
    end
    it 'Edit address' do
      
    end

    it 'Edit owner' do
      
    end
  end
  
end
