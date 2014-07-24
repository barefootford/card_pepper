require 'spec_helper'

describe 'Creating a new user' do 
  it 'saves the user and shows her profile page' do    
    visit root_url

    click_link 'Sign Up'

    expect(current_path).to eq(new_user_path)

    fill_in 'First Name',  with: 'Example'
    fill_in 'Last Name',  with: 'User'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'secret'
    fill_in 'Confirm Password', with: 'secret'
    
    click_button 'Create Account'

    expect(page).to have_text('Example User')
    expect(page).to have_text('Thanks for signing up!')
    expect(page).to have_link('Sign Out')

    expect(page).not_to have_link('Sign Up')
    expect(page).not_to have_link('Sign In')
  end

  it 'will not save an invalid user' do
    visit sign_up_url

    expect { 
      click_button 'Create Account'
    }.not_to change(User, :count)

    expect(page).to have_text('error')

    expect(page).not_to have_text('Account Settings')
  end
end