require 'spec_helper'

describe 'Signing in a user' do
  it "prompts for an email and password" do
    visit root_url

    click_link 'Sign In'

    expect(current_path).to eq(sign_in_path)

    expect(page).to have_field('Email')
    expect(page).to have_field('Password')          
  end


  it "won't happen if the email or password is invalid" do
    user = User.create!(user_attributes)

    visit sign_in_url  

    fill_in 'Email', with: user.email
    fill_in 'Password', with: "badsecret"
    
    click_button 'Sign In!'

    expect(page).to have_text('Invalid')
    expect(page).to have_link('Sign In')
    expect(page).to have_link('Sign Up')

    expect(page).not_to have_text(user.name)
    expect(page).not_to have_link(user.name)
    expect(page).not_to have_link('Sign Out')
  end

  it "works if email/password is valid" do
    user = User.create!(user_attributes)
    
    visit sign_in_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In!'

    expect(current_path).to eq(user_path(user))

    expect(page).to have_text("Welcome back, #{user.name}.")
    expect(page).to have_link('Sign Out')
    expect(page).to have_link(user.name)
    
    expect(page).not_to have_link('Sign In')
    expect(page).not_to have_link('Sign Up')
  end
end
