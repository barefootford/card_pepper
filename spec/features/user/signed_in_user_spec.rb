require 'spec_helper'

describe 'Signed in users' do 
  it 'shows special deck editor tools' do
    visit root_url

    expect(page).not_to have_text('Deck Manager')

    create_a_user
    sign_in(@user)

    visit root_url

    expect(page).to have_text('Deck Manager')
  end
end