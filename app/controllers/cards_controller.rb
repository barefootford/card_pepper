class CardsController < ApplicationController

  before_action :chapter, only: [:create, :destroy, :edit]
  
  def create
    @card = @chapter.cards.new(card_params)
    if @card.save
      redirect_to edit_deck_chapter_path(@chapter.deck, @chapter),
        notice: 'Card added successfully.'  
    else
      render '/chapters/edit'
    end
  end

  def edit
    @card = card
  end

  def destroy
    @chapter = chapter
    @card = card
    @card.destroy
    redirect_to edit_deck_chapter_path(@chapter.deck, @chapter),
      notice: 'Card deleted.'
  end

  private

  def card_params
    params.require(:card).permit(:question, :answer)    
  end

  def card
    @card ||= Card.find(params[:id])    
  end

  def chapter
    @chapter ||= Chapter.find(params[:chapter_id])
  end
end