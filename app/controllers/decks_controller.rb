class DecksController < ApplicationController
  before_action :require_sign_in, except: [:show, :index]
  before_action :deck, only: [:show, :show_discussion, :edit, :update, :destroy, :download]
  before_action :require_creator, only: [:edit, :update, :destroy]
  before_action :dont_show_edit_button, only: [:show]
  before_action :must_be_beta_approved

  def show
    @deck_editor = deck.user
    @card_suggestions = @deck.card_suggestions.select {|cs| cs.pending?}
      .map {|cs| CardSuggestion.addClientSideAttributes(cs)}

    puts "before @cards"
    @cards = deck.cards.saved.active.includes(:user, :card_edits)
    puts 'after @cards'
    @cards_with_client_side_attributes = @cards.collect do |card|
      card = Card.addClientSideAttributes(card)
    end
    puts 'after @cards_with_client_side_attributes'

    @card_edits = @cards.collect(&:card_edits).flatten
      .select {|ce| ce.pending? }
      .map(&:serializable_hash)

    respond_to do |format|
      format.html
      format.csv { download_csv }
    end
  end

  def show_discussion
    @deck = deck
    @deck_editor = @deck.user
  end

  def edit
    @card_suggestions = @deck.card_suggestions.pending.includes(:user)
    @card_suggestions_with_client_side_attributes = @card_suggestions.collect do |cs|
      cs = CardSuggestion.addClientSideAttributes(cs)
    end

    @deck_editor = @deck.user
    @cards = @deck.cards.saved.active.includes(:user, :card_edits)

    @cards_with_client_side_attributes = @cards.collect do |card|
      card = Card.addClientSideAttributes(card)
    end

    @card_edits = @cards.collect {|card| card.card_edits }.flatten
      .select {|ce| ce.pending? }
      .map(&:serializable_hash)
  end

  def update
    if @deck.update(deck_params)
      payload = {
        errors: [],
        flash: "Deck updated successfully.",
        deck: { title: @deck.title, instructions: @deck.instructions}
      }
      status = 200
    else
      payload = {
        errors: @deck.errors.messages,
        flash: ""
      }
      status = 422
    end
    render json: payload, status: status
  end

  def destroy
    @deck.destroy
    redirect_to root_url, notice: "#{@deck.title} deck deleted successfully."
  end

  def new
    @new_deck = current_user.decks.build
  end

  def create
    @new_deck = current_user.decks.new(deck_params)
    if @new_deck.save
       redirect_to edit_deck_path(@new_deck), notice: "Deck built successfully."
    else
      render :new
    end
  end

  def contributors
    # grab the deck and include all of its cards ('created cards') and card_edits (recomendations to cards)
    deck = Deck.where(id: params[:id]).includes(:cards, :card_edits).first
    cards_created_by_users_count = Deck.sum_by_user_id(deck.cards)
    cards_edited_by_users_count = Deck.sum_by_user_id(deck.card_edits)
    combined_user_ids = cards_edited_by_users_count.keys + 
      cards_created_by_users_count.keys
    users = User.where(id: combined_user_ids)

    # Return an array of objects that represent simplified user objects with a user name, user url and the number of cards they have edited and created
    # [{:name=>"Andrew Ford", :url=>"/users/1", :created=>11, :edited=>20}, {:name=>"kailey kelley", :url=>"/users/2", :created=>3, :edited=>12}]
    response = users.map do |user|
      {
        name: user.name,
        url: user_path(user),
        cards_created_count: cards_created_by_users_count[user.id].to_i,
        cards_edited_count: cards_edited_by_users_count[user.id].to_i
      }
    end

    render json: response
  end

private
  def set_deck_subscription
    if current_user.deck_subscriptions.where(deck: deck).any?
      @deck_subscription = current_user.deck_subscriptions.where(deck: deck).first
    else
      @new_deck_subscription = current_user.deck_subscriptions.new(deck: deck) 
    end
  end

  def download_csv
    send_data @deck.to_csv, filename: @deck.file_name
  end

  def dont_show_edit_button
    @show_edit_button = false
  end

  def require_creator
    unless current_user && current_user == deck.user
      redirect_to root_url, notice: "Only the deck's creator can edit the deck."
    end
  end

  def set_deck
    deck
  end

  def deck
    @deck ||= Deck.includes(:user, :card_suggestions).find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:title,:editor,:instructions)
  end
end
