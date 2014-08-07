class CardSuggestionsController < ApplicationController

  def new
  end

  def create
    @deck = deck
    @chapter = chapter
    @suggested_card = @chapter.card_suggestions.new(card_suggestion_params)  
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
  
  def deck
    @deck ||= chapter.deck    
  end

  def card_suggestion_params
    params.require(:card_suggestion).permit(:question, :answer, :purpose)    
  end

  def chapter
    @chapter ||= Chapter.find(params[:chapter_id])
  end
end
