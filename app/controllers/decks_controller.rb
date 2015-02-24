class DecksController < ApplicationController
  before_action :require_sign_in, except: [:show, :index]
  before_action :require_creator, only: [:edit, :update, :destroy]
  before_action :deck, only: [:show, :edit, :update, :destroy]
  before_action :dont_show_delete_button, only: [:show]
  before_action :do_show_delete_button, only: [:edit]
  before_action :current_user
  before_action :must_be_beta_approved

  def index
    @decks = Deck.all.limit(10)
  end

  def show
    @card_suggestion = CardSuggestion.new
    @cards = deck.cards

    respond_to do |format|
      format.html
      format.csv { send_data @deck.to_csv, filename: @deck.file_name }
    end
  end

  def edit
    @card_suggestions = @deck.card_suggestions.pending
    @new_card = @deck.cards.build
    @cards = @deck.cards.saved
  end

  def update
    @deck.update(deck_params)
    redirect_to edit_deck_path(@deck), notice: "Deck updated successfully."
  end

  def destroy
    @deck.destroy
    redirect_to root_url, notice: 'Deck deleted successfully.'
  end

  def new
    @deck = current_user.decks.new
  end

  def create
    @deck = current_user.decks.new(deck_params)
    if @deck.save
       redirect_to edit_deck_path(@deck), notice: "Deck built successfully."
    else
      render :new
    end
  end

private

  def dont_show_delete_button
    @show_delete_button = false
  end

  def do_show_delete_button
    @show_delete_button = true
  end

  def require_creator
    unless current_user && current_user == deck.user
      redirect_to root_url, notice: "Only the deck's creator can edit the deck."
    end
  end

  def deck
    @deck ||= Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title,:editor,:instructions)
  end
end