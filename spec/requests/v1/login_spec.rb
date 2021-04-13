require 'rails_helper'
RSpec.describe "Login", type: :request do  
  describe 'Login and logout' do

    it 'No sign in, no resource access' do
      # No resource access
    end

    let(:user){ create :user }   

    it 'User can be found inside the database' do
      saved_user = User.find_by(email: user.email) 
      expect(user).to eq( saved_user)
    end

    it 'Unsuccessful login and no resource access' do
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

      # No access to resources
      
    end    

    it 'Successfull login and access to resource' do   

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
      
      # User has access to resources

    end

    it 'Successful logout and no access to resources' do  

      post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }
    
      delete '/api/v1/auth/sign_out',
        headers: {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': user[:email]
        }
      expect(json['success']).to be(true)
      expect(response.status).to eq(200)

      # No access to resources
    end 
  end
end