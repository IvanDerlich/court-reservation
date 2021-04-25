require 'rails_helper'

RSpec.describe Court, type: :model do

  describe 'Court Creation' do
    
    let!(:user){ create :user } 
    it 'create one court' do  
      court = Court.create!(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator: user
      )
      expect(Court.all.first).to eq(court) 
    end

    it 'Create one court with the same name as another one' do  
      court = create :court  
      court2 = Court.create(
        name: court.name,
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator: user
      )
      expect(court2.valid?).to be(false) 
    end

    it 'Create valid court with description length zero' do
      court = Court.create!(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        description: '',
        administrator: user
      )
      expect(Court.all.first).to eq(court) 
    end

    it 'Create valid court with no description' do      
      court = Court.create!(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        administrator: user
      )
      expect(Court.all.first).to eq(court) 
    end

    it 'Create invalid court: name too long' do
      court = Court.create(
        name: Faker::Lorem.characters(number:41),
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator: user
      )
      expect(court.valid?).to be(false) 
    end

    it 'Create invalid court: name blank' do
      court = Court.create(
        name: '',
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator: user
      )
      expect(court.valid?).to be(false) 
    end
    it 'Create invalid court: name not present' do
      court = Court.create(
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator: user
      )
      expect(court.valid?).to be(false)
    end

    it 'Create invalid court: description too long' do
      court = Court.create(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        description: Faker::Lorem.characters(number:101),
        administrator: user
      )
      expect(court.valid?).to be(false) 
    end

    it 'Create invalid court: address too long' do
      court = Court.create!(
        name: Faker::Name.name,
        address: Faker::Address.street_address,
        description: Faker::Lorem.characters(number:51),
        administrator: user
      )
    end

    it 'Delete court' do
      court = create :court    
      expect(
        Court.find_by(name:court.name).destroy
      ).to eq(court)
    end    
  end
  describe 'Court edit' do
    let!(:court){ create :court}
    it 'Edit name' do
      name = "Jacinto"
      court.update(name: name)
      expect(Court.all.first.name).to eq(name)
    end
    it 'Edit name to another that has the same name' do
      court2 = create(:court)
      expect(court2.update(name:court.name)).to eq(false)      
    end
    it 'Edit address' do
      address = "Jacinto"
      court.update(address: address)
      expect(Court.first.address).to eq(address)
    end    

    it 'Edit address: nil' do         
      expect(
        court.update(address: nil)
      ).to eq(false)
    end

    it 'Edit address: address too long' do
      expect(
        court.update(address: Faker::Lorem.characters(number:51))
      ).to eq(false)      
    end

    it 'Edit administrator' do
      user = create :user
      court.update(administrator: user)
      expect(Court.first.administrator).to eq(user)
    end

    it 'Invalid edition: administrator empty' do
      expect(
        court.update(administrator: nil)
      ).to eq(false)
    end

    it 'Invalid edition: name too long' do
      expect(
        court.update(name: Faker::Lorem.characters(number:41))
      ).to eq(false)
    end

    it 'Invalid edition: name blank' do
      expect(
        court.update(name: '')
      ).to eq(false)
    end

    it 'Invalid edition: name nil' do
      expect(
        court.update(name: nil)
      ).to eq(false)
    end

    it 'Invalid edition: description too long' do
      expect(
        court.update(description: Faker::Lorem.characters(number:101))
      ).to eq(false)
    end

    it 'Invalid edition: description blank' do
      court.update!(description: '')      
      expect(
        Court.first.description
      ).to eq('')
    end

    it 'Invalid edition: description nil' do
      court.update!(description: nil)      
      expect(
        Court.first.description
      ).to eq(nil)
    end

    it 'Invalid edition: address too long' do
      expect(
        court.update(address: Faker::Lorem.characters(number:51))
      ).to eq(false)
    end

    it 'Invalid edition: address nil' do
      expect(
        court.update(address: nil)
      ).to eq(false)
    end

    it 'Invalid edition: address blank' do
      expect(
        court.update(address: '')
      ).to eq(false)
    end

    it 'Edit address: blank' do       
      expect(
        court.update(address: ''
      )).to eq(false)
    end
  end
  
end
