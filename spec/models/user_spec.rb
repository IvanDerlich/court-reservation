require 'rails_helper'

RSpec.describe User, type: :model do  
  describe 'User creation' do
    it 'Valid user' do
      user = User.create(
        email:'asdfs@adsafsd.com',
        password:'testtest',
        first_name: 'Pepe',
        last_name: 'Honguito'
      )      
      expect(user.valid?).to be(true)      
    end  

    it 'Invalid user: invalid email' do
      user = User.create(
        email:'asdfsadsafsd.com',
        password:'test',
        first_name: 'Pepe',
        last_name: 'Honguito'
      )      
      expect(user.valid?).to be(false)
      expect(user.errors.objects.first.full_message)
        .to eq("Email is not an email")
    end
    it 'Invalid user: duplicate email' do
      email = "asdfasdfas@asdfasd.com"
      user1 = User.create(
        email:email,
        password:'testtest',
        first_name: 'Pepe',
        last_name: 'Honguito'
      )
      expect(user1.valid?).to be(true)
      user2 = User.create(
        email: email,
        password:'testtest2',
        first_name: 'Pablo',
        last_name: 'Gimenez'
      )
      expect(user2.valid?).to be(false)
      expect(user2.errors.objects.first.full_message)
        .to eq("Email has already been taken")
    end
    it 'Invalid user: Password not present ' do
      user = User.create(
        email:'asdfsadsafsd@asdfds.com',
        password: '',
        first_name: 'Pepe',
        last_name: 'Honguito'
      )
      expect(user.valid?).to be(false)
      expect(user.errors.objects.first.full_message)
        .to eq("Password can't be blank")
    end
    it 'Invalid user: First Name not present ' do
      user = User.create(
        email:'asdfsadsafsd@asdfds.com',
        password:'testtest',
        first_name: '',
        last_name: 'Honguito'
      )
      expect(user.errors.objects.first.full_message)
      .to eq("First name can't be blank")      
    end

    it 'Invalid user: Last Name not present ' do
      user = User.create(
        email:'asdfsadsafsd@asdfds.com',
        password:'testtest',
        first_name: 'Pepe',
        last_name: ''
      )
      expect(user.errors.objects.first.full_message)
      .to eq("Last name can't be blank")      
    end
  end

  describe 'User deletion' do
    let(:user){create(:user)}
    it '' do      
      id = user.id
      expect(user.destroy).to eq(user)
    end 
  end  

  describe 'User edition' do

    let(:user){create(:user)}

    it 'edit first name' do         
      user.update(first_name: 'José')
      expect(User.all.first.first_name).to eq('José')      
    end

    it 'edit invalid first name' do            
      expect(
        user.update(first_name: '')
      ).to eq(false)      
    end

    it 'edit invalid first name: too long' do
      expect(
        user.update(first_name: Faker::Lorem.characters(number:21))
      ).to eq(false)
    end

    it 'edit last name' do
      user.update(last_name: 'Fernández')
      expect(User.all.first.last_name).to eq('Fernández')
    end

    it 'edit invalid last name: empty' do
      expect(
        user.update(last_name: '')
      ).to eq(false)
    end

    it 'edit invalid last name: too long' do
      expect(
        user.update(last_name: Faker::Lorem.characters(number:21))
      ).to eq(false)
    end

    it 'edit email invalid, too short' do
      expect(
        user.update(email: '')
      ).to eq(false)
    end

    it 'edit email invalid, empty' do
      expect(
        user.update(email: 'asdfasd')
      ).to eq(false)
    end

    it 'edit email invalid, not email format' do
      expect(
        user.update(email: 'asdfasd.')
      ).to eq(false)
    end  

    let(:user2){create(:user)}
    it 'edit email with conflict: other user has the same email' do
      email = user.email
      expect(
        user2.update(email: email)
      ).to eq(false)
    end

    # it 'edit password' do    
    #   expect(
    #     user.update(password: Faker::Lorem.characters(number:8))
    #   ).to eq(true)      
    # end

    # it 'edit password: too short' do
    #   expect(
    #     user.update(password: Faker::Lorem.characters(number:7))
    #   ).to eq(false)
    # end
 
    # it 'edit password: too long' do
    #   expect(
    #     user.update(password: Faker::Lorem.characters(number:101))
    #   ).to eq(false)
    # end
  end
  

  describe 'Read User/s' do

    let!(:user1){create(:user)}
    let!(:user2){create(:user)}

    it 'Reads one user' do
      expect(User.find_by(email:user1.email)).to eq(user1)
    end
   
    it 'Reads many users' do
      expect(User.all.length).to be(2)
    end
  end
end
