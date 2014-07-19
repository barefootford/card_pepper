module DecksHelper
  def title_and_editor(deck)
    "#{deck.title} (#{deck.user.name})"
  end

  def deck_history(deck)
    "Created #{deck.created_at.strftime("%B %d, %Y.")}"
  end

  def number_of_cards(number)
    "#{number} #{"card".pluralize(number)}"
  end
end