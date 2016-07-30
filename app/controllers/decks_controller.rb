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
    @deck = Deck.where(id:params[:id]).includes(:cards).first
    card_ids = @deck.cards.collect {|c| c.id}

    deck_card_suggestions = CardSuggestion.approved.where(deck_id: @deck.id)
    deck_card_edits = CardEdit.approved.where(card_id: card_ids)

    cs_user_ids = deck_card_suggestions.collect {|cs| cs.user_id}
    ce_user_ids = deck_card_edits.collect{|ce| ce.user_id}
    combined_user_ids = (cs_user_ids + ce_user_ids).uniq

    contributors = User.where(id: [combined_user_ids])

    response = contributors.collect do |c|
      card_edit_count = deck_card_edits.select {|ce| ce.user_id == c.id }.size
      card_suggestions_count = deck_card_suggestions.select {|cs| cs.user_id == c.id }.size
      ce_and_cs = (card_edit_count > 0 && card_suggestions_count > 0)

      if card_edit_count > 0
        card_edit_text = "#{card_edit_count} #{"Card edit".pluralize(card_edit_count)}"
      else
        card_edit_text = ''
      end

      if card_suggestions_count > 0
        card_suggestions_text = " #{card_suggestions_count} #{"Card Suggestion".pluralize(card_suggestions_count)}"
      else
        card_suggestions_text = ''
      end

      {
        name: c.name,
        url: user_path(c),
        contributionText: "#{card_edit_text}#{"," if ce_and_cs}#{card_suggestions_text}"
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