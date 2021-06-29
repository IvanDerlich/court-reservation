# rubocop:disable Lint/EmptyBlock
require 'rails_helper'

RSpec.describe Court, type: :request do
  # <login>
  let!(:user) { create(:user) }

  before do
    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: user.password
         }
    expect(response.status).to eq(200)
  end

  let(:headers) do
    {
      'access-token': response.headers['access-token'],
      client: response.headers['client'],
      uid: user[:email]
    }
  end
  # </login>

  after do
    get "/courts/#{court_id}/bookings", headers: headers
    expect(json.length).to be(10)
    (0..9).each do |i|
      expect(json[i].description).to eq(bookings[i].description)
      expect(
        DateTime.parse(json[i].created_at).strftime('%c')
      ).to eq(bookings[i].created_at.strftime('%c'))
      expect(
        DateTime.parse(json[i].created_at).strftime('%c')
      ).to eq(bookings[i].created_at.strftime('%c'))
    end
  end

  let!(:court) { create(:court) }
  let!(:bookings) { create_list(:booking, 10, booker_id: user.id, court_id: court.id) }
  let!(:court_id) { court.id }

  it 'Show all the bookings a court has with the same loged in user' do
  end

  let!(:user2) { create(:user) }
  let!(:court) { create(:court, administrator_id: user2.id) }
  let!(:bookings) { create_list(:booking, 10, booker_id: user2.id, court_id: court.id) }
  let(:court_id) { court.id }

  it 'Show all the bookings a court has with another loged in user' do
  end
end
# rubocop:enable Lint/EmptyBlock
