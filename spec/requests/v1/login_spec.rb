require 'rails_helper'
RSpec.describe "Login", type: :request do  
  describe 'Login and logout' do

    let(:user){ create :user }   

    it 'User can be found inside the database' do
      saved_user = User.find_by(email: user.email) 
      expect(user).to eq( saved_user)
    end

    it 'Unsuccessful login' do
      post '/api/v1/auth/sign_in',
        params: { 
          email: "asdfsad",
          password: "asdf"
        }
      expect(response.status).to eq(401)      
      expect(json['success']).to eq(false)      
      expect(json['errors'][0]).to eq(
        "Invalid login credentials. Please try again."
      )      
    end    

    it 'Successfull login' do   

      post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }

      expect(response.status).to eq(200)
      data = json['data']
      expect(data['email'])       .to eq(user[:email])
      expect(data['first_name'])  .to eq(user[:first_name])
      expect(data['last_name'])   .to eq(user[:last_name])
      expect(data['uid'])         .to eq(user[:uid])
      expect(data['provider'])    .to eq(user[:provider])   

    end

    it 'Successful logout' do  

      post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }

      expect(response.status).to eq(200)    

      delete '/api/v1/auth/sign_out',
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': user[:email]
        }
      expect(json['success']).to be(true)
      expect(response.status).to eq(200)
    end 
  end
end