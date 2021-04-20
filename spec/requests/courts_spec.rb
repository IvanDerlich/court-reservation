require 'rails_helper'

RSpec.describe "Courts", type: :request do
  # initialize test data
  let!(:user) { create(:user)}
  let!(:courts) { create_list(:court, 10) }
  let(:court_id) { courts.first.id }
  let!(:court1) { create :court }
  let!(:court2) { create :court }

  it 'User can be found inside the database' do
    saved_user = User.find_by(email: user.email) 
    expect(user).to eq( saved_user)
  end

  it 'Courts can be found inside the database' do
    saved_court1 = Court.find_by(name: court1.name) 
    expect(court1).to eq(saved_court1)
    saved_court2 = Court.find_by(name: court2.name) 
    expect(court2).to eq(saved_court2)
    expect(Court.all.size).to be(12)
  end
  
  it 'No sign in, no court access' do
    get "/courts"
    expect(response.status).to eq(401)
  end

  before { 
    post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }
    
    response_global = response
    login_data = json['data']
    expect(response.status).to eq(200)
    expect(login_data['email']).to eq(user[:email])
    expect(login_data['first_name'])  .to eq(user[:first_name])
    expect(login_data['last_name'])   .to eq(user[:last_name])
    expect(login_data['uid'])         .to eq(user[:uid])
    expect(login_data['provider'])    .to eq(user[:provider]) 
  }

  let(:headers){{
    'access-token': response.headers['access-token'],
    'client': response.headers['client'],
    'uid': user[:email]
  }}
  describe "GET /courts" do
    before {
      get '/courts', headers: headers }    

    it 'Code 200' do      
      expect(response.status).to eq(200)     
    end

    it 'returns todo' do
      expect(json).not_to be_empty
      expect(json.size).to eq(12)
    end

  end
  describe 'GET /courts/:id' do
    before {
      get "/courts/#{court_id}", headers: headers
    }
    context 'when the record exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the court' do
        p json
      end
    end

    context 'when the record does not exist' do
      let!(:court_id) { 500 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Court/)
      end

    end
  end

  describe 'POST /todos' do
    let(:valid_attributes) { { 
      name: Faker::Lorem.characters(number:6),
      address: Faker::Address.street_address,
      description: Faker::Lorem.sentence,
      administrator_id: user.id
    } }
    context 'when the request is valid' do
      
      before { 
        post "/courts",
          params: valid_attributes,
          headers: headers
      }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'creates a court' do
        expect(json['name']).to eq(valid_attributes[:name])
        expect(json['address']).to eq(valid_attributes[:address])
        expect(json['description']).to eq(valid_attributes[:description])
        expect(json['administrator_id']).to eq(valid_attributes[:administrator_id])
      end
      
    end
    context 'when the request is invalid' do
      it 'Blank name' do
        params = {
          name: "",
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:20),
          administrator_id: user.id
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Name not present' do
        params = {
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:20),
          administrator_id: user.id
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Empty administrator' do
        params = {
          name: Faker::Lorem.characters(number:6),
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:20),
          administrator_id: ""
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Blank administrator' do
        params = {
          name: Faker::Lorem.characters(number:6),
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:20),
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Name too long' do
        params = {
          name: Faker::Lorem.characters(number:41),
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:20),
          administrator_id: user.id
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Description too long' do
        params = {
          name: Faker::Lorem.characters(number:10),
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number:101),
          administrator_id: user.id
        }
        
        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Address too long' do
        params = {
          name: Faker::Lorem.characters(number:10),
          address: Faker::Lorem.characters(number:51),
          description: Faker::Lorem.characters(number:10),
          administrator_id: user.id
        }     

        post "/courts",
          params: params,
          headers: headers

        expect(response).to have_http_status(422)
      end
    end
  end
end
