require 'rails_helper'

RSpec.describe Booker, type: :model do
  describe 'Creation' do
    context 'Valid Creation' do
      it 'Create a valid booking with a description' do
      end
      it 'Create a valid booking with no description' do
      end
    end
    context 'Invalid Creation' do
      it 'Minutes and seconds are not zero' do
      end
      it 'There is no booker' do
      end
      it 'There is no court' do
      end
      it 'Datetime and court already taken' do
      end
    end
  end
end
