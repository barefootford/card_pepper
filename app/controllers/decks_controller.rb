class DecksController < ApplicationController

before_action :require_sign_in, except: [:show, :index]
before_action :require_creator, only: [:edit, :update, :destroy]

  def index
    @decks = Deck.all.limit(10)
    
    if current_user
      @user_decks = current_user.decks
    end  
  end

  def show  
    set_deck
  end

  def edit
    set_deck
    @chapter = Chapter.new(deck_id: set_deck.id)
  end

  def update
    set_deck
    @deck.update(deck_params)
    redirect_to @deck, notice: "Deck updated successfully."    
  end

  def destroy
    set_deck
    @deck.destroy    
    redirect_to root_url, notice: 'Deck deleted successfully.'
  end

  def new
    @deck = current_user.decks.new
  end

  def create
    @deck = current_user.decks.new(deck_params)
    if @deck.save
       @deck.chapters.create!(title:"Chapter 1")
       redirect_to edit_deck_path(@deck), notice: "Deck built successfully. Add a chapter to store cards."
    else
      render :new
    end
  end

  private

  def require_creator
    unless current_user && current_user == set_deck.user
      redirect_to root_url, notice: "Only the deck's creator can edit the deck."
    end
  end

  def set_deck
    @deck ||= Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title,:editor,:instructions)    
  end

end