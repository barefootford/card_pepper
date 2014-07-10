class DecksController < ApplicationController

  before_action :require_sign_in, except: [:show]
  before_action :require_creator, only: [:edit, :update, :destroy]

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
       redirect_to @deck, notice: "Deck built successfully."  
    else
      render :new
    end
  end

  private

  def require_creator
    unless current_user && current_user == current_model(self).find(params[:id]).user
      redirect_to root_url, notice: "Only the #{current} creator can edit the '###'."
    end
  end

  def set_deck
    @deck = Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title,:editor,:instructions)    
  end

  def current_model(controller)
    @model ||= controller.class.to_s.sub('sController','').constantize
  end
end