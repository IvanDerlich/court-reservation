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
    it '' do
      user = create(:user)
      id = user.id
      p user.destroy
    end 
  end  

  describe 'User edition' do

    it 'edit first name' do
      
    end
    it 'edit last name' do
      
    end

    it 'edit email with no conflict' do
    
    end

    it 'edit email with conflict: other user has the same email' do
    
    end

    it 'edit password' do
    
    end
  end
  

  describe 'Read User/s' do
    it 'Reads one user' do
    end
   
    it 'Reads many users' do
    end
  end
end
