require 'spec_helper'

describe 'A user' do
  xit 'can be created with a name' do 
    user = User.new(name:'')

    expect(user.valid?).to be_false
    # expect(user.errors[:name].any?).to be_true
  end

  it 'can be created without a name'

  it 'accepts names where length > 1' do
    user = User.new(name:'I')
    expect(user.valid?).to be_false
    expect(user.errors[:name].any?).to be_true
  end

  it 'accepts properly formatted email addresses' do 
    emails = %w[user@gmail.com user@yahoo.com]
    emails.each do |email|
      user = User.new(email: email)

      expect(user.errors[:email].any?).to be_false
      expect(user.valid?).to be_false
    end
  end

  it 'rejects improper email addresses' do 
    emails = ['user3', 'john@', '##']

    emails.each do |email|
      user = User.new(email: email)

      expect(user.valid?).to be_false
      expect(user.errors[:email].any?).to be_true
    end
  end

  it 'requires an email address' do 
    user = User.new(email:"")
    
    expect(user.save).to be_false
    expect(user.errors[:email].any?).to be_true
  end

  it 'is valid with demo attributes' do
    user = User.new(user_attributes)
    
    expect(user.valid?).to be_true
    
    expect {
      user.save
    }.to change(User, :count)
  end
end