class CardsController < ApplicationController
  before_action :chapter, only: [:create, :destroy, :edit]
  
  def create
    @card = @chapter.cards.new(card_params)
    
    respond_to do |format|
      format.html { create_card_html }
      format.js { create_card_js } 
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
    params.require(:card).permit(:question, :answer, :chapter_id)
  end

  def card
    @card ||= Card.find(params[:id])
  end

  def chapter
    @chapter ||= Chapter.find(params[:chapter_id])
  end

  def create_card_js
    if @card.save
      render :create
    else
      puts "there are some errors."
      render :errors
    end
  end

  def create_card_html
  end
end