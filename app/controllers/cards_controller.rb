class CardsController < ApplicationController

  before_action :set_chapter, only: [:create, :destroy, :edit]
  
  def create
    @card = @chapter.cards.new(card_params)
    if @card.save
      redirect_to edit_chapter_path(@chapter),
        notice: 'Card added successfully.'  
    else
      render '/chapters/edit'
    end
  end

  def edit
    @card = set_card
  end

  def destroy
    @card = set_card
    @card.destroy
    redirect_to edit_chapter_path(set_chapter),
      notice: 'Card deleted.'
  end

  private

  def card_params
    params.require(:card).permit(:question, :answer)    
  end

  def set_card
    @card ||= Card.find(params[:id])    
  end

  def set_chapter
    @chapter ||= Chapter.find(params[:chapter_id])
  end
end