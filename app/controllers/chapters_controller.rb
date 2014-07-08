class ChaptersController < ApplicationController
  # before_action :current_deck
  before_action :require_sign_in, except: [:index, :show]

  def new
    @chapter = current_deck.chapters.new
  end

  def create
    @chapter = current_deck.chapters.new(deck_params)
    if @chapter.save
      redirect_to chapter_path(@chapter), notice: "One new chapter."
    else
      render :new
    end
  end

  def show
    current_chapter
  end

  def edit
    current_chapter
  end

  def update
    if current_chapter && chapter_params[:title]
      @chapter.update(chapter_params)
      redirect_to @chapter
    else
      render :edit
    end
  end

private
  
  def current_chapter
    @chapter = Chapter.find(params[:id])
  end

  def current_deck
    @deck = Deck.find(params[:deck_id])
  end

  def deck_params
    params.require(:chapter).permit(:title, :deck_id)
  end

  def chapter_params
    params.require(:chapter).permit(:title)
  end
end
