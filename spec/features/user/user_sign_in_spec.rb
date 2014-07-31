require 'spec_helper'

describe 'Signing in a user' do
  it 'works if email/password is valid' do
    user = User.create!(user_attributes)
    
    visit new_session_path

    fill_in 'email', with: user.email
    fill_in 'password', with: user.password
    click_button 'Sign In'

    expect(current_path).to eq(user_path(user))
    expect(page).to have_text("Welcome back, #{user.name}.")
    expect(page).to have_link('Sign Out')
    expect(page).to have_link('Account')
    
    expect(page).not_to have_link('Sign In')
    expect(page).not_to have_link('Sign Up')
  end

  it 'prompts for an email and password' do
    visit new_session_url

    expect(page).to have_field('email')
    expect(page).to have_field('password')          
  end

  it 'will not work with a bad password' do
    user = User.create!(user_attributes)

    visit new_session_path  

    fill_in 'email', with: user.email
    fill_in 'password', with: 'wrongsecret'
    
    click_button 'Sign In'

    expect(page).to have_text('Invalid')
    expect(page).to have_link('Sign Up')

    expect(page).not_to have_link('Sign Out')
    expect(page).not_to have_link('Account')
  end

end
