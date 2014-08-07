require 'spec_helper'

describe 'Creating a new user' do 
  it 'can be accessed from the homepage' do 
    visit root_url
    expect(page).to have_link('Sign Up')
    first(:link, 'Sign Up').click
    
    expect(current_path).to eq(new_user_path)
  end
  
  it 'saves the user and shows her community decks' do    
    visit new_user_path

    expect(current_path).to eq(new_user_path)

    fill_in('user_email', with: 'user@example.com')
    fill_in('user_first_name', with: 'Example')
    fill_in('user_last_name', with: 'User')

    fill_in('user_password', with: 'secret')
    fill_in('user_password_confirmation', with: 'secret')
    
    click_button 'Create Account'

    expect(page).to have_text('Account')
    expect(page).to have_text('Thanks for signing up!')
    expect(page).to have_link('Sign Out')

    expect(page).not_to have_link('Sign Up')
    expect(page).not_to have_link('Sign In')
  end

 it 'will not save an invalid user' do
    visit new_user_path

    expect { 
      click_button 'Create Account'
    }.not_to change(User, :count)

    expect(page).to have_text('error')
    expect(page).not_to have_link('Sign Out')
  end
end