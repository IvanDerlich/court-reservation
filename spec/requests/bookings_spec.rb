require 'rails_helper'

RSpec.describe "Bookings", type: :request do
  let!(:user) { create(:user)}
  let!(:court) { create( :court, :administrator => user)}
  let!(:bookings) { create_list :booking, 10, :court => court}
  # let(:booking_id) { bookings.first.id }

  it 'Bookings can be found inside the database and properly accessed' do
    expect(Booking.all.size).to be(10)
    expect(user.bookings.size).to be(10)
    expect(court.bookings.size).to be(10)
  end

  it 'No sign in, no booking access' do
    get "/courts/#{court.id}/bookings"
    expect(response.status).to eq(401)
  end


  before {
    post '/api/v1/auth/sign_in',
      params: { 
        email: user.email,
        password: user.password
      }      
    expect(response.status).to eq(200)    
  }

  let(:headers){{
    'access-token': response.headers['access-token'],
    'client': response.headers['client'],
    'uid': user[:email]
  }}


  describe 'GET' do    
    context 'Show Bookings' do
      it 'Show one Booking', :focus do
        court1 = create(:court)
        # p court1
        booking1 = create(:booking, :court => court1)
        # get "/courts/#{court1.id}/bookings/#{booking1.id}", headers: headers
        get "/courts/#{court1.id}/bookings/#{booking1.id}", headers: headers
        expect(json['description']).to eq(booking1.description)
        expect(
          DateTime.parse(json['created_at']).strftime("%c")
        ).to eq(booking1.created_at.strftime("%c"))
        # p DateTime.parse(json['created_at']).strftime("%c")
        # p booking1.created_at.strftime("%c")
        # p booking1
        # expect(json['description']).to eq(booking1.description)
      end
      it 'Show many Bookings' do
        get "/courts/#{court.id}/bookings", headers: headers        
        expect(json.length).to be(10)
        expect(json[0]['description']).to eq(bookings[0].description)
        expect(json[7]['description']).to eq(bookings[7].description)
      end
    end
  end
  describe 'POST' do    
    context 'Invalid' do
      it 'No Parameters' do

      end
    end
  end
  describe 'PUT' do
    context 'Invalid' do
      it 'No parameters' do
      end
    end
  end
  describe 'DELETE' do
  end
end