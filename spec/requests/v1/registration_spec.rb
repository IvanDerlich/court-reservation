require 'rails_helper'
RSpec.describe "Registrations", type: :request do

  describe 'Registration ' do
    Pepe = {
      email:'asdfs@adsafsd.com',
      password:'testtest',
      first_name: 'Pepe',
      last_name: 'Honguito'
    }
    it 'Successfully' do
      
      post '/api/v1/auth', params: Pepe
         
      expect(json['status']).to eq('success')
      data = json['data']
      expect(data['email']).to eq(Pepe[:email])      
      expect(data['first_name']).to eq(Pepe[:first_name])
      expect(data['last_name']).to eq(Pepe[:last_name])
      expect(data['uid']).to eq(Pepe[:email])
      expect(data['provider']).to eq('email')
    end
    it 'Unsuccessfully: invalid email' do
      Pepe['email'] = 'dafsdsaf'
      p Pepe
    end

    it 'Unsuccessfully: empty email' do
    end

    it 'Unsuccessfully: invalid password' do
    end

    it 'Unsuccessfully: empty password' do
    end
  end  
  describe 'Login' do
    it 'Successfull' do
    end
    it 'Unsuccessful' do
    end
  end
end