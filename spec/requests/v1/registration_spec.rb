require 'rails_helper'
RSpec.describe 'Registrations', type: :request do
  describe 'Registration ' do
    Pepe = {
      email: 'asdfs@adsafsd.com',
      password: 'testtest',
      first_name: 'Pepe',
      last_name: 'Honguito'
    }
    it 'Successfully' do
      post '/api/v1/auth', params: Pepe

      expect(json['status']).to eq('success')
      expect(response.status).to eq(200)
      data = json['data']
      expect(data['email']).to eq(Pepe[:email])
      expect(data['first_name']).to eq(Pepe[:first_name])
      expect(data['last_name']).to eq(Pepe[:last_name])
      expect(data['uid']).to eq(Pepe[:email])
      expect(data['provider']).to eq('email')
    end
    it 'Unsuccessfully: invalid email' do
      Pepe[:email] = 'dafsdsaf'
      post '/api/v1/auth', params: Pepe
      expect(response.status).to eq(422)
      expect(json['status']).to eq('error')
      expect(json['errors']['full_messages']).to eq([
                                                      'Email is not an email',
                                                      'Email is invalid'
                                                    ])
    end

    it 'Unsuccessfully: empty email' do
      Pepe[:email] = ''
      post '/api/v1/auth', params: Pepe
      expect(response.status).to eq(422)
      expect(json['status']).to eq('error')
      expect(json['errors']['full_messages']).to eq([
                                                      "Email can't be blank",
                                                      'Email is invalid'
                                                    ])
    end

    it 'Unsuccessfully: invalid password' do
      Pepe[:password] = Faker::Lorem.characters(number: 101)
      Pepe[:email] = 'asdfs@adsafsd.com'
      post '/api/v1/auth', params: Pepe
      expect(response.status).to eq(422)
      # expect(json['status']).to eq('error')
      # expect(json['errors']['full_messages']).to eq([
      #   "Password is too short (minimum is 8 characters)"
      # ])
    end

    it 'Unsuccessfully: empty password' do
      Pepe[:password] = ''
      post '/api/v1/auth', params: Pepe
      expect(response.status).to eq(422)
      expect(json['status']).to eq('error')
      expect(json['errors']['full_messages']).to eq([
                                                      "Password can't be blank",
                                                      'Password is too short (minimum is 8 characters)'
                                                    ])
    end
  end
end
