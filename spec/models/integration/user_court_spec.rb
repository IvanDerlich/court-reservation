require 'rails_helper'

RSpec.describe User, type: :model do
 
  let(:user1){ create :user}
  let(:user2){ create :user}
  let(:court1) { create :court}
  let(:court2) { create :court}

  it 'Add one court to the user' do
    
  end

  it "Can't delete user" do
      
  end

  it 'Change court administrator' do
  end

  it 'Shows user court' do
  end

  it 'Add two courts' do
    
  end

  it 'Shows user courts' do
  end

  it 'Can\t delete user' do
      
  end

  it 'Delete one court' do
    
  end

  it 'Delete all courts of user' do
    
  end

  it 'Can delete user' do
    
  end
  
end