require 'spec_helper'

describe 'Approving Card Suggestions' do 
  it 'can be done through the dashboard' do 
    create_user
    create_deck
    
    create_second_user
    card_suggestion = CardSuggestion.create!(card_attributes(user_id: @user2.id, chapter_id: @chapter.id))

    sign_in(@user)
    visit dashboard_path(@user)

    expect(current_path).to eq(dashboard_path(@user))
    expect(page).to have_text('Dashboard')
    expect(page).to have_text('Pragmatic Studio Ruby Notes')

    expect(page).to have_text('Is the sky blue?')
    expect(page).to have_text('Yes')  
    
    click_link('approve-card')

    # expect(page).to have_button('Approve')
  end
end
