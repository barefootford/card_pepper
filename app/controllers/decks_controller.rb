class DecksController < ApplicationController

  before_action :require_sign_in, except: [:index, :show]
  before_action :require_deck_creator, only: [:edit, :update, :destroy]

  def index
    @decks = Deck.all
    if current_user
      @user_decks = current_user.decks
    end  
  end

  def show  
    set_deck
  end

  def edit
    set_deck    
  end

  def update
    set_deck
    @deck.update(deck_params)
    redirect_to @deck    
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
       redirect_to @deck, notice: "Deck created successfully. Let's get to work."  
    else
      render :new
    end
  end

  private

  def require_deck_creator
    
    unless current_user == Deck.find(params[:id]).user
      redirect_to root_url, notice: 'Only the deck creator can edit the deck.'
    end    
  end

  def set_deck
    @deck = Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title,:editor,:instructions)    
  end
end