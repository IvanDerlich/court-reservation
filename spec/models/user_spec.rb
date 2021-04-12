require 'rails_helper'

RSpec.describe User, type: :model do  
  describe 'User creation' do
    it 'Valid user' do
      user = User.create(
        email:'asdfs@adsafsd.com',
        password:'testtest',
        name: 'Pepe'
      )      
      expect(user.valid?).to be(true)      
    end
    it 'Invalid user: invalid email' do
      user = User.create(
        email:'asdfsadsafsd.com',
        password:'test',
        name: 'Pepe'
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
        name: 'Pepe'
      )
      expect(user1.valid?).to be(true)
      user2 = User.create(
        email: email,
        password:'testtest2',
        name: 'Pablo'
      )
      expect(user2.valid?).to be(false)
      expect(user2.errors.objects.first.full_message)
        .to eq("Email has already been taken")
    end
    it 'Invalid user: Password not present ' do
      user = User.create(
        email:'asdfsadsafsd@asdfds.com',
        password: '',
        name: 'Pepe'
      )
      expect(user.valid?).to be(false)
      expect(user.errors.objects.first.full_message)
        .to eq("Password can't be blank")
    end
    it 'Invalid user: Name not present ' do
      user = User.create(
        email:'asdfsadsafsd@asdfds.com',
        password:'testtest',
        name: ''
      )
      expect(user.errors.objects.first.full_message)
      .to eq("Name can't be blank")      
    end
  end
end
