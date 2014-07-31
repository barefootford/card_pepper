class ChaptersController < ApplicationController
  
  before_action :require_sign_in, except: [:index]
  before_action :current_deck, only: [:create]

  def create
    @chapter = current_deck.chapters.new(chapter_params)
    if @chapter.save
      redirect_to edit_deck_path(@deck), notice: "Chapter added."
    else
      render :new
    end
  end

  def index
    redirect_to decks_path    
  end

  def new
    redirect_to decks_path
  end

  def show
    if chapter
      redirect_to deck_path(@chapter.deck)
    else
      redirect_to decks_path
    end
  end

  def edit    
    @chapter       = chapter
    @chapter_cards = @chapter.cards
  end

  def destroy
    parent_deck = chapter.deck
    chapter.destroy
    redirect_to edit_deck_path(parent_deck), notice:'Chapter deleted.'
  end

  def update
    if chapter
      @chapter.update(chapter_params)
      redirect_to edit_deck_path(@chapter.deck),
      notice: 'Chapter title updated.'
    else
      render :edit
    end
  end

private

  def chapter
    @chapter ||= Chapter.find(params[:id])
  end

  def current_deck
    @deck = Deck.find(params[:deck_id])
  end

  def chapter_params
    params.require(:chapter).permit(:title)
  end
end
