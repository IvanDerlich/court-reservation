require 'rails_helper'

RSpec.describe "V1::Contacts", type: :request do

  let(:contact1) do 
    {
      first_name: 'Ivan',
      last_name: 'Drago',
      email: 'ivandrago@gmail.com'
    }
  end

  let(:contact2) do 
    {
      first_name: 'Pablo',
      last_name: 'Perez',
      email: 'pabloperez@gmail.com'
    }
  end

  describe 'GET /contactst' do
    before { get '/v1/contacts'}
    it '01 return empty list', focus: true do
      expect(json).to be_empty
    end
  end
  describe 'POST PUT DELETE /v1/contacts' do
    
    context 'One' do           

      it 'Create one contact, edit it and delete it' do
        get '/v1/contacts'
        expect(json).to be_empty

        post '/v1/contacts', params: contact1
        expect(response).to have_http_status(201)
        expect(json['first_name']).to eq('Ivan')
        expect(json['last_name']).to eq('Drago')
        expect(json['email']).to eq('ivandrago@gmail.com')
        id = json['id']        
        get '/v1/contacts'        
        expect(response).to have_http_status(200)                
        
        get '/v1/contacts'
        expect(json.length).to be(1)    

        # edit contact
        put '/v1/contacts/' + id.to_s, params: {first_name:'Pepe'}
        expect(response).to have_http_status(200)
        expect(json['first_name']).to eq('Pepe')
        expect(json['last_name']).to eq('Drago')
        expect(json['email']).to eq('ivandrago@gmail.com')
        expect(json['id']).to eq(id)
        
        # puts json
        delete '/v1/contacts/' + id.to_s
        expect(response).to have_http_status(200) 

        # Check list length is empty
        get '/v1/contacts'
        expect(json).to be_empty
      end          
    end

    context 'Two' do
      it 'Creates two contacts and deletes them all' do
        get '/v1/contacts'
        expect(json).to be_empty

        post '/v1/contacts', params: contact1
        id1 = json['id'] 
        post '/v1/contacts', params: contact2
        id2 = json['id'] 
        get '/v1/contacts'
        expect(json.length).to be(2)

        delete '/v1/contacts/' + id1.to_s
        expect(response).to have_http_status(200) 

        get '/v1/contacts'
        expect(json.length).to be(1)

        delete '/v1/contacts/' + id2.to_s
        expect(response).to have_http_status(200) 

        get '/v1/contacts'
        expect(json.length).to be(0)
      end
    end
    
    context 'Three' do
      it 'Creates one contact and show it individually' do
        get '/v1/contacts'
        expect(json).to be_empty
        post '/v1/contacts', params: contact1
        id = json['id']
        get '/v1/contacts/' + id.to_s
        expect(json['first_name']).to eq('Ivan')
        expect(json['last_name']).to eq('Drago')
        expect(json['email']).to eq('ivandrago@gmail.com')
        id = json['id']         
      end
    end
  end
end
