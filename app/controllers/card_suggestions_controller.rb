class CardSuggestionsController < ApplicationController

  def new
  end

  def create
    @deck = set_deck
    @suggested_card = CardSuggestion.new(card_suggestion_params)  
    @suggested_card.user_id = current_user.id

    if @suggested_card.save
      redirect_to @suggested_card.chapter.deck,
      notice: "Card suggestion added. The Deck's editor will be notified."
    else
      render 'decks/show'
    end
  end

  def approve    
  end

  def edit
  end

  def update
  end

  def destroy
  end

private
  
  def set_deck
    @deck ||= set_chapter.deck
  end

  def set_chapter
    @chapter ||= Chapter.find(params[:card_suggestion][:chapter_id])
  end

  def selected_chapter
    params.require(:chapter_id)   
  end

  def card_suggestion_params
    params.require(:card_suggestion).permit(:question, :answer, :purpose)
  end
end
