module CardSuggestionsHelper
  def card_suggestions_count
    " (#{@deck.card_suggestions.pending.count})" if @deck && (@deck.card_suggestions.pending.count > 0)
  end
end