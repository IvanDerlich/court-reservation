require 'rails_helper'
RSpec.describe 'Authorization', type: :request do
  let!(:user){create :user}
  let!(:court1){create :court}
  let!(:court2){create :court}  

  it 'User can be found inside the database' do
    saved_user = User.find_by(email: user.email)
    expect(user).to eq(saved_user)
  end

  it 'Courts can be found inside the database' do
    saved_court1 = Court.find_by(name: court1.name)
    expect(court1).to eq(saved_court1)
    saved_court2 = Court.find_by(name: court2.name)
    expect(court2).to eq(saved_court2)
  end

  it 'No sign in, no court access' do
    get '/courts'
    expect(response.status).to eq(401)
  end

  it 'No sign, no booking access' do
    get "/courts/#{court1.id}/bookings"
    expect(response.status).to eq(401)
  end

  it 'Sign in and resource access' do
    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: user.password
         }
    expect(response.status).to eq(200)

    login_data = json['data']
    expect(login_data['email']).to eq(user[:email])
    expect(login_data['first_name']).to eq(user[:first_name])
    expect(login_data['last_name']).to eq(user[:last_name])
    expect(login_data['uid']).to eq(user[:uid])
    expect(login_data['provider']).to eq(user[:provider])

    get '/courts', headers: {
      'access-token': response.headers['access-token'],
      client: response.headers['client'],
      uid: user[:email]
    }

    expect(response.status).to eq(200)

    expect(json.first['name']).to eq(court1.name)
    expect(json.first['id']).to eq(court1.id)
    expect(json.first['address']).to eq(court1.address)
    expect(json.first['administrator_id']).to eq(court1.administrator_id)

    expect(json.second['name']).to eq(court2.name)
    expect(json.second['id']).to eq(court2.id)
    expect(json.second['address']).to eq(court2.address)
    expect(json.second['administrator_id']).to eq(court2.administrator_id)
  end

  it 'Log in, log out and no resource access' do
    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: user.password
         }

    expect(response.status).to eq(200)

    delete '/api/v1/auth/sign_out',
           headers: {
             'access-token': response.headers['access-token'],
             client: response.headers['client'],
             uid: user[:email]
           }

    expect(response.status).to eq(200)

    get '/courts'
    expect(response.status).to eq(401)
  end
end
