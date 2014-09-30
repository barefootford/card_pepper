require 'spec_helper'

describe 'Approving Card Suggestions' do 
  it 'can be done through the dashboard' do 
    create_user
    create_deck
    
    create_second_user
    card_suggestion = CardSuggestion.create!(
      card_attributes(user_id: @user2.id,
      chapter_id: @chapter.id)
    )

    sign_in(@user)
    visit dashboard_path(@user)

    expect(current_path).to eq(dashboard_path(@user))
    expect(page).to have_text('Pragmatic Studio Ruby Notes')
    expect(page).to have_text(card_attributes[:question])

    expect { click_link 'Approve' }.to change(Card, :count).by(1)
    expect(current_path).to eq(deck_path(@deck))
  end
end
