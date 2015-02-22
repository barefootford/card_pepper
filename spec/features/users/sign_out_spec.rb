require 'spec_helper'

describe 'Signing out' do
  it 'removes signed in abilities' do
    sign_in(create_user)

    expect(current_path).to eq(dashboard_path)

    click_link 'sign-out-button'

    expect(page).to have_text("signed out")
    expect(page).to have_link('Sign In')
    expect(page).not_to have_link('Sign Out')
  end
end