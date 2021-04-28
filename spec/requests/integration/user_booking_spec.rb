require 'rails_helper'

RSpec.describe User, type: :request do

  # <login>
  let!(:user) { create(:user)}

  before{
    post '/api/v1/auth/sign_in',
    params: { 
      email: user.email,
      password: user.password
    }    
    response_global = response
    login_data = json['data']
    expect(response.status).to eq(200)
  }

  let(:headers){{
    'access-token': response.headers['access-token'],
    'client': response.headers['client'],
    'uid': user[:email]
  }}
  # </login>

  describe 'User-Booking Integration' do    
    let!(:bookings) { create_list :booking, 10, :booker => user }

    after {
      get "/users/#{user_id}/bookings", headers: headers
      # p response.body
      expect(json.length).to be(10)    
      for i in 0..9 do
        expect(json[i].description).to eq(bookings[i].description)
        expect(
          DateTime.parse(json[i].created_at).strftime("%c")
        ).to eq(bookings[i].created_at.strftime("%c"))
        expect(
          DateTime.parse(json[i].created_at).strftime("%c")
        ).to eq(bookings[i].created_at.strftime("%c"))
      end
    }

    let(:user_id){user.id}
    it 'Show all the bookings a user has booked' do
    end  

    let!(:user2){ create(:user)}    
    let!(:bookings) { create_list(:booking,10, :booker_id => user2.id)}
    let(:user_id){user2.id}
    it 'Show all the bookings another user has booked' do
    end  
  end  
end