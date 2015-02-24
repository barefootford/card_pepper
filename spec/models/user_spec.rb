require 'spec_helper'

describe 'A user' do
  it 'can be created with a reasonable first/last name' do 
    user = User.new(first_name:'Jon', last_name:'Gon')
    expect(user.valid?).to be_false
    expect(user.errors[:first_name].any?).to be_false
    expect(user.errors[:last_name].any?).to be_false
  end

  it 'does not accept first names where length is less than 1' do
    user = User.new(first_name:'X')
    expect(user.valid?).to be_false
    expect(user.errors[:first_name].any?).to be_true
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

  it 'is pending when first created' do 
    user = User.create!(user_attributes(beta_status: 0))

    expect(user.pending?).to be_true
  end

  it 'can be approved' do
    user = User.create!(user_attributes(beta_status: :approved))

    expect(user.approved?).to be_true
  end


  it 'is valid with demo attributes' do
    user = User.new(user_attributes)
    
    expect(user.valid?).to be_true
    
    expect {
      user.save
    }.to change(User, :count)
  end

  describe 'website' do 
    it 'always displays a website with http when website attribute exists' do 
      user = User.new
      user.website = 'http://google.com'
      expect(user.website).to eq('http://google.com')
    end
    
    it 'will not show a website if the attribute is not set' do 
      user = User.new(website:'')
      expect(user.website).to be_nil
    end
    
    it 'will append http to websites entered without it' do 
      user = User.new(website:'cybiko.com')
      expect(user.website).to eq('http://cybiko.com')  
    end
  end

  describe 'new?' do 
    it 'returns true for users who are less than 30 days old' do 
      user = User.new
      user.created_at = Time.new-5.days
      expect(user.new?).to be_true
    end

    it 'returns false for users that are more than 30 days old' do 
      user = User.new
      user.created_at = Time.new-60.days
      expect(user.new?).to be_false
    end
  end
end