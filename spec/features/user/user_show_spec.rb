require 'spec_helper'

describe 'Showing a user' do 
  it 'can be viewed by anyone' do 
    create_user

    visit user_path(@user)
    expect(current_path).to eq(user_path(@user))

    expect(page).to have_text(@user.name)
  end
end