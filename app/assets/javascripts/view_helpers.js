var ViewHelpers = {
  communityContributionsCount(cardsArray, deckEditorID) {
    // Community contributions are any cards where the
    // card's user_id is not the deck editor's id.
    // That means the card was created by someone else.
    return(_.filter(cardsArray, function(card) {
      return card.user_id !== deckEditorID
    }).length)

  },

  pluralizeCard: function(number) {
    if (_.isUndefined(number)) {
      console.log("pluralizeCard was called without a number.");
    };

    if ( _.isNumber(number) ) {
      if (number === 1) {
        return '1 card'
      } else if (number > 1) {
        return (_.toString(number) + ' cards')
      } else {
        return '0 cards'
      }
    } else {
      return '0 cards'
    }
  },

  pluralizeContrib: function(number) {
    if (_.isUndefined(number)) {
      console.log("pluralizeContrib was called without a number.");
    };

    if ( _.isNumber(number) ) {
      if (number === 1) {
        return '1 community contribution '
      } else if (number > 1) {
        return (_.toString(number) + ' community contributions ')
      } else {
        return '0 community contributions '
      }
    } else {
      return '0 community contributions '
    }
  }
};