# rubocop:disable Lint/EmptyBlock
require 'rails_helper'

RSpec.describe User, type: :request do
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

  describe 'User-Booking Integration' do
    let!(:bookings_mine) { create_list :booking, 10, booker: user }
    let!(:bookings_others) {
      create_list :booking, 10, court: create(
        :court,
        administrator: user,
      )
    }

    context "Show all other's bookings on user's court" do
      it "" do
        get '/bookings/on-others', headers: headers, params: {
          email: user.email
        }
        p response
      end
    end

    context "Show all user's bookings on others courts" do
      it '' do
        get '/bookings/on-mine', headers: headers, params: {
          email: user.email
        }
        p response
        # for i in 0..9 do
        #   expect(json[i].id).to eq(bookings_mine[i].id)
        #   expect(json[i].booker_id).to eq(bookings_mine[i].booker_id)
        #   expect(json[i].court_id).to eq(bookings_mine[i].court_id)
        #   expect(json[i].description).to eq(bookings_mine[i].description)
        # end
      end
    end
  end
end

# rubocop:enable Lint/EmptyBlock
