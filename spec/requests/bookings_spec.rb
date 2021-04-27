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
      it 'Show one Booking' do
        court1 = create(:court)
        booking1 = create(:booking, :court => court1)
        get "/courts/#{court1.id}/bookings/#{booking1.id}", headers: headers
        expect(json['description']).to eq(booking1.description)
        expect(
          DateTime.parse(json['created_at']).strftime("%c")
        ).to eq(booking1.created_at.strftime("%c"))
      end
      it 'Show many Bookings' do
        get "/courts/#{court.id}/bookings", headers: headers        
        expect(json.length).to be(10)
        expect(json[0]['description']).to eq(bookings[0].description)
        expect(json[7]['description']).to eq(bookings[7].description)
      end
    end
  end
  describe 'POST -> Create Bookings' do
    let(:valid_params){{
      booker_id: user.id,
      description: Faker::Lorem.characters(number:30),
      date: DateTime.new(2021,05,02,16,0,0)
    }}
    context 'Happy path' do
      after{
        post "/courts/#{court.id}/bookings",
          headers: headers,
          params: valid_params 
          expect(json).not_to be(nil)
        expect(json.description)
        .to eq(valid_params[:description])
        expect(
          DateTime.parse(json.date).strftime("%c")
        ).to eq(
          valid_params[:date].strftime("%c")
        )
      }
      it 'With description' do   
      end
      it 'With no description' do 
        valid_params.delete(:description)
      end
    end
    context 'Invalid entity'   do
      after{
        post "/courts/#{court.id}/bookings",
          headers: headers,
          params: valid_params 
        expect(response).to have_http_status(422)
      }
      it 'Blank date' do        
        valid_params[:date] = ""                
      end
      it 'No date parameter' do
        valid_params.delete(:date)
      end
      it 'Blank booker' do        
        valid_params[:booker_id] = ""      
      end
      it 'No booker parameter' do
        valid_params.delete(:booker_id)
      end
      it 'Booker not existent' do        
        user.id = 69876967
      end  
      it 'No required parameters' do
        valid_params.delete(:booker_id)
        valid_params.delete(:date)
      end
      it 'Long description' do
        valid_params[:description] = Faker::Lorem.characters(number:101)
      end
    end
    context 'Invalid Routing' do      
      it 'No court' do
        court.id = nil
        expect{
          post "/courts/#{court.id}/bookings",
          headers: headers,
          params: valid_params 
        }.to raise_error
      end
    end
    context 'Not found'  do 
      it 'Court not existent' do        
        court.id = 69876967
        post "/courts/#{court.id}/bookings",
          headers: headers,
          params: valid_params 
        expect(response).to have_http_status(404)
      end     
    end
  end
  describe 'PUT -> Update Bookings' do    
    let(:booking){create :booking}
    context 'Valid editions' do     
      it 'Update Description' do 
        description = Faker::Lorem.characters(number:15)
        put "/courts/#{booking.court.id}/bookings/#{booking.id}",
          headers: headers,
          params: {
            description: description
          }
        expect(response).to have_http_status(200)
        expect(json).not_to be(nil)
        expect(json.description).to eq(description)
        expect(Booking.find(booking.id).description).to eq(description)
         
      end
      it 'Update Date' do 
        date = random_date
        put "/courts/#{booking.court.id}/bookings/#{booking.id}",
          headers: headers,
          params: {
            date: date
          }
        expect(response).to have_http_status(200)
        expect(json).not_to be(nil)
        expect(
          DateTime.parse(json.date).strftime("%c")
        ).to eq(
          Booking.find(booking.id).date.strftime("%c")
        ) 
      end
    end
    context 'Invalid', :focus  do
      let(:params){{}}
      after{
        put "/courts/#{booking.court.id}/bookings/#{booking.id}",
          headers: headers,
          params: params   
        expect(response).to have_http_status(:unprocessable_entity)
      }

      it 'No parameters' do
      end

      it 'Change Booker' do        
        params[:booker_id] = user.id
      end   
      # There's no point in changing court because court_id will end up being
      # The one sent in the url. The one over the params will endup being overwritten
      it 'Long Description' do
        params[:description] = Faker::Lorem.characters(number:101)
      end

      it 'Invalid Date' do
        params[:date] = "adsfasdfasd"
      end
      it 'nil Date' do
        params[:date] = nil
      end
      
    end
  end
  describe 'DELETE' do
    context 'Valid' do
      it 'Happy path' do
      end
    end
    context 'Invalid' do
      it "Booking doesn't exist" do
      end
    end
  end
end