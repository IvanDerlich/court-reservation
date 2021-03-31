require 'rails_helper'

RSpec.describe "V1::Contacts", type: :request do
  describe 'GET /contactst' do
    before { get '/v1/contacts'}
    it '01 return empty list', focus: true do
      expect(json).to be_empty
    end
  end
  describe 'POST /v1/contacts' do
    valid_attributes = { 
      first_name: 'Ivan',
      last_name: 'Drago'
    }
    context 'Creates one contact edits it and deletes it' do
        before { post '/v1/contacts', params: valid_attributes}
        it 'Checks status 201' do
          expect(response).to have_http_status(201)
        end
        it 'Checks correct attributes' do
          expect(json['first_name']).to eq('Ivan')
          expect(json['last_name']).to eq('Drago')
        end
        xit 'Checks contact list increased by one' do
        end
        # Updates one contact
        # before { put }

        xit 'Checks correct HTTP code' do
        end

        xit 'Check edited contact is OK' do
        end

        # Deltes contact
        # before {delete }
        xit 'Checks status code is OK' do
        end

        xit 'Checks Contact List reduced by one or empty' do
        end
    end
  end
end
