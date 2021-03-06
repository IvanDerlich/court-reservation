# rubocop:disable Lint/EmptyBlock
require 'rails_helper'

RSpec.describe 'Courts', type: :request do
  let!(:user) { create(:user) }
  let!(:courts) { create_list(:court, 10) }
  let(:court_id) { courts.first.id }
  let!(:court1) { create :court }
  let!(:court2) { create :court }

  it 'User can be found inside the database' do
    saved_user = User.find_by(email: user.email)
    expect(user).to eq(saved_user)
  end

  it 'Courts can be found inside the database' do
    saved_court1 = Court.find_by(name: court1.name)
    expect(court1).to eq(saved_court1)
    saved_court2 = Court.find_by(name: court2.name)
    expect(court2).to eq(saved_court2)
    expect(Court.all.size).to be(12)
  end

  it 'No sign in, no court access' do
    get '/courts'
    expect(response.status).to eq(401)
  end

  before do
    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: user.password
         }
    expect(response.status).to eq(200)
    login_data = json.data
    expect(login_data['email']).to eq(user[:email])
    expect(login_data['first_name']).to eq(user[:first_name])
    expect(login_data['last_name']).to eq(user[:last_name])
    expect(login_data['uid']).to eq(user[:uid])
    expect(login_data['provider']).to eq(user[:provider])
  end

  let(:headers) do
    {
      'access-token': response.headers['access-token'],
      client: response.headers['client'],
      uid: user[:email]
    }
  end
  describe 'GET /courts' do
    before do
      get '/courts', headers: headers
    end

    it 'Code 200' do
      expect(response.status).to eq(200)
    end

    it 'returns court' do
      expect(json).not_to be_empty
      expect(json.size).to eq(12)
    end
  end
  describe 'GET /courts/:id' do
    before do
      get "/courts/#{court_id}", headers: headers
    end

    it 'Success' do
      expect(response).to have_http_status(200)
      expect(json['name']).to eq(courts.first.name)
      expect(json['description']).to eq(courts.first.description)
      expect(json['address']).to eq(courts.first.address)
      expect(json['administrator_id']).to eq(courts.first.administrator_id)
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

  describe 'POST /courts ->' do
    let(:valid_attributes) do
      {
        name: Faker::Lorem.characters(number: 6),
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator_id: user.id
      }
    end
    context 'When the request is valid' do
      before do
        post '/courts',
             params: valid_attributes,
             headers: headers
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'creates a court' do
        expect(json['name']).to eq(valid_attributes[:name])
        expect(json['address']).to eq(valid_attributes[:address])
        expect(json['description']).to eq(valid_attributes[:description])
        expect(json['administrator_id']).to eq(valid_attributes[:administrator_id])
      end

      context 'GET /user/court' do
        let(:valid_attributes2) do
          {
            name: Faker::Lorem.characters(number: 6),
            address: Faker::Address.street_address,
            description: Faker::Lorem.sentence,
            administrator_id: user.id
          }
        end

        it 'See the created courts' do
          # create anothe court
          post '/courts',
               params: valid_attributes2,
               headers: headers

          get "/user/courts",
              params: {
                email: user.email
              },
              headers: headers
          expect(json.first.name).to eq(valid_attributes[:name])
          expect(json.first.address).to eq(valid_attributes[:address])
          expect(json.first.description).to eq(valid_attributes[:description])
          expect(json.first.administrator_id).to eq(user.id)
          expect(json.second.name).to eq(valid_attributes2[:name])
          expect(json.second.address).to eq(valid_attributes2[:address])
          expect(json.second.description).to eq(valid_attributes2[:description])
          expect(json.second.administrator_id).to eq(user.id)
        end
      end
    end
    # rubocop:disable Metrics/BlockLength
    context 'when the request is invalid ->' do
      let(:params) do
        {
          name: Faker::Lorem.characters(number: 6),
          address: Faker::Address.street_address,
          description: Faker::Lorem.characters(number: 20),
          administrator_id: user.id
        }
      end

      after(:each) do
        post '/courts',
             params: params,
             headers: headers

        expect(response).to have_http_status(422)
      end

      it 'Blank name' do
        params[:name] = ''
      end

      it 'Name not present' do
        params.delete(:name)
      end

      it 'Blank administrator' do
        params[:administrator_id] = ''
      end

      it 'Empty administrator' do
        params.delete(:administrator_id)
      end

      it 'Name too long' do
        params[:name] = Faker::Lorem.characters(number: 41)
      end

      it 'Name already taken' do
        params[:name] = courts.first.name
      end

      it 'Description too long' do
        params[:description] = Faker::Lorem.characters(number: 101)
      end

      it 'Address too long' do
        params[:address] = Faker::Lorem.characters(number: 101)
      end
    end
  end
  # rubocop:enable Metrics/BlockLength
  describe 'PUT /courts/:id -> ' do
    context 'when the record exists -> ' do
      let!(:court_put) { create(:court, administrator_id: user.id) }
      it 'returns status code 204' do
        name = Faker::Lorem.characters(number: 10)
        # p "court_put"
        # p court_put
        # p "user"
        # p user
        put "/courts/#{court_put.id}",
            headers: headers,
            params: {
              name: name
            }
        expect(response).to have_http_status(202)
      end
    end

    context 'when the record does not exist' do
      it 'Code for court not found' do
        put '/courts/999939',
            headers: headers,
            params: {
              name: Faker::Lorem.characters(number: 10)
            }
        expect(response).to have_http_status(404)
      end
      it 'When the id is a string' do
        put '/courts/dfghdfghfdg',
            headers: headers,
            params: {
              name: Faker::Lorem.characters(number: 10)
            }
        expect(response).to have_http_status(422)
      end
    end

    context 'when the record exist and the edition is invalid - ' do
      let(:valid_attributes) { {} }
      let!(:court_put2) { create(:court, administrator_id: user.id) }
      after do
        put "/courts/#{court_put2.id}",
            headers: headers,
            params: valid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'No parameters' do
      end

      it 'Name already taken' do
        valid_attributes[:name] = courts.second.name
      end

      it 'Blank name' do
        valid_attributes[:name] = ''
      end

      it 'Blank administrator' do
        valid_attributes[:administrator_id] = ''
      end

      it 'Name too long' do
        valid_attributes[:name] = Faker::Lorem.characters(number: 41)
      end

      it 'Description too long' do
        valid_attributes[:description] = Faker::Lorem.characters(number: 101)
      end

      it 'Address too long' do
        valid_attributes[:address] = Faker::Lorem.characters(number: 101)
      end
    end
  end
  describe 'DELETE /courts/' do
    let!(:court_delete) { create(:court, administrator_id: user.id) }
    it 'Record exists' do
      delete "/courts/#{court_delete.id}",
             headers: headers
      expect(response).to have_http_status(204)
    end

    it "Record doesn't exist" do
      delete '/courts/12341234123',
             headers: headers
      expect(response).to have_http_status(404)
    end
  end
end
# rubocop:enable Lint/EmptyBlock
