require 'rails_helper'

RSpec.describe User, type: :request do
  let!(:user) { create(:user) }

  before do
    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: user.password
         }
    response_global = response
    login_data = json['data']
    expect(response.status).to eq(200)
  end

  let(:headers) do
    {
      'access-token': response.headers['access-token'],
      client: response.headers['client'],
      uid: user[:email]
    }
  end
  describe 'User-Court Integration' do
    let!(:courts) { create_list(:court, 10, administrator_id: user.id) }
    it 'Show all the courts a user administers' do
      get "/users/#{user.id}/courts", headers: headers
      expect(json.length).to be(10)
      expect(json.first.description).to eq(courts.first.description)
    end

    let(:valid_attributes) do
      {
        name: Faker::Lorem.characters(number: 6),
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator_id: user.id
      }
    end
    it 'Add a court to a new user and show it' do
      post '/courts',
           params: valid_attributes,
           headers: headers
      expect(response).to have_http_status(201)
      court_id = json['id']
      get "/courts/#{court_id}", headers: headers
      expect(json.description).to eq(valid_attributes[:description])
      expect(json.address).to eq(valid_attributes[:address])
      expect(json.administrator_id).to eq(valid_attributes[:administrator_id])
      expect(json.name).to eq(valid_attributes[:name])
    end
    let!(:user1) { create(:user) }
    let!(:court) { create :court, administrator_id: user1.id }
    it "Can't delete other user's courts" do
      delete "/courts/#{court.id}",
             headers: headers
      expect(response).to have_http_status(401)
    end
    it "Can't edit other user's courts" do
      put "/courts/#{court.id}",
          headers: headers,
          params: {
            name: Faker::Lorem.characters(number: 10)
          }
      expect(response).to have_http_status(401)
    end

    it "Can't create courts with an administrator.id different than self.id" do
      valid_attributes = {
        name: Faker::Lorem.characters(number: 6),
        address: Faker::Address.street_address,
        description: Faker::Lorem.sentence,
        administrator_id: user1.id
      }

      post '/courts',
           headers: headers,
           params: valid_attributes

      expect(response).to have_http_status(401)
    end
  end
end
