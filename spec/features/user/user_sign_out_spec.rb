require 'spec_helper'

describe 'Signing out' do 
  it 'removes signed in abilities' do
    user = User.create!(user_attributes)
    sign_in(user)

    expect(current_path).to eq(user_path(user))
    click_link 'Sign Out'

    expect(page).to have_text("signed out")
    expect(page).to have_link('Sign In')
    expect(page).not_to have_link('Sign Out')
  end
end