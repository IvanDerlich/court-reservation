require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'User creation' do
    it 'Valid user' do
      user = User.new(email:'asdfs@adsafsd.com', password_digest:'test')
      expect(user.valid?).to be(true)      
    end
    it 'Invalid user: invalid email' do
      user = User.new(email:'asdfsadsafsd.com', password_digest:'test')
      expect(user.valid?).to be(false)
    end
    it 'Invalid user: duplicate email' do
      email = "asdfasdfas@asdfasd.com"
      user1 = User.create(email:email, password_digest:'test')
      expect(user1.valid?).to be(true)
      user2 = User.new(email: email, password_digest:'test')
      expect(user2.valid?).to be(false)
    end
    it 'Invalid user: Password not present ' do
      user = User.new(email:'asdfsadsafsd.com', password_digest: '')
      expect(user.valid?).to be(false)
    end
  end
end
