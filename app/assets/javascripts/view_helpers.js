var ViewHelpers = {
  communityContributionsCount: function(cardsArray, deckEditorID) {
    // Community contributions are any cards where the
    // card's user_id is not the deck editor's id.
    // That means the card was created by someone else.
    var count = _.filter(cardsArray, function(card) {
      return card.user_id !== deckEditorID
    }).length;

    return count
  },

  sortCards: function(arrayOfCards) {
    return _.sortBy(arrayOfCards, function(c) { return c.id })
  },

  pluralizeCard: function(number, capitalizeResults) {
    if (_.isUndefined(number)) {
      console.log("pluralizeCard was called without a number.");
    };

    var integer = _.toSafeInteger(number);
    var shouldCapitalize = (capitalizeResults === true) ? true : false

    if (integer === 1) {
      return shouldCapitalize ? '1 Card' : '1 card'
    } else if (integer > 1) {
      var capitalized = _.toString(integer) + ' Cards';
      var lowercase   = _.toString(integer) + ' cards';
      return shouldCapitalize ? capitalized : lowercase
    } else {
      return shouldCapitalize ? '0 Cards' : '0 cards'
    }
  },

  basicValidationsFail: function(text) {
    var textEmptyOrBlank = (text.length === 0 || _.trim(text).length === 0)
    return textEmptyOrBlank
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
  },

  standardInternetIsDownMessage: "We're having trouble connecting to Card Pepper. Ensure your Internet is working, then try again or refresh the page."
};