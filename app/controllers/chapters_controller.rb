class ChaptersController < ApplicationController
  # before_action :current_deck
  
  before_action :require_sign_in, except: [:index]
  before_action :current_deck, only: [:create]

  def new
    redirect_to decks_path unless current_deck
    @chapter = current_deck.chapters.new
  end

  def create
    @chapter = current_deck.chapters.new(deck_params)
    if @chapter.save
      redirect_to edit_deck_path(@deck), notice: "Chapter added."
    else
      render :new
    end
  end

  def edit
    @chapter = current_chapter
  end

  def destroy
    parent_deck = current_chapter.deck
    current_chapter.destroy
    redirect_to edit_deck_path(parent_deck), notice:'Chapter deleted.'
  end

  def update
    if current_chapter # && chapter_params[:title]
      @chapter.update(chapter_params)
      redirect_to edit_deck_path(@chapter.deck)
    else
      render :edit
    end
  end

private
  
  def current_chapter
    Chapter.find(params[:id])
  end

  def current_deck
    redirect_to decks_path unless params[:deck_id]
    @deck = Deck.find(params[:deck_id])
  end

  def deck_params
    params.require(:chapter).permit(:title, :deck_id)
  end

  def chapter_params
    params.require(:chapter).permit(:title)
  end
end
