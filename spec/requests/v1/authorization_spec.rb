require 'rails_helper'
RSpec.describe "Authorization", type: :request do  

  let(:user){ create :user } 

  it 'User can be found inside the database' do
    saved_user = User.find_by(email: user.email) 
    expect(user).to eq( saved_user)
  end

  it 'No sign in, no resource access' do
    # No resource access
  end

  it 'Sign in and resource access' do
    post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }
    # resource access
  end

  it 'Log in, log out and no resource access' do
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

    # No resource access
  end
end