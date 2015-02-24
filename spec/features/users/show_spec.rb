require 'spec_helper'

describe 'Showing a user' do
  before(:each) do
    create_user
    sign_in(@user)
    visit user_path(@user)
  end

  it 'can be viewed by any approved user' do
    expect(current_path).to eq(user_path(@user))
    expect(page).to have_text(@user.name)
  end
end