DeckEditView = React.createClass({
  getInitialState: function() {
    return(
      {
        // Only call addToFlashes() to add flashes
        flashes: [],
        activeComponent: 'New Card',

        newCard: this.newCard(),
        // server-provided cards
        cards: this.props.cards,

        cardSuggestions: this.props.cardSuggestions,

        // Call deckSettingsSaved() to modify deckSettingsSavedRecently
        deckSettingsSavedRecently: false,
        deckTitle: this.props.initialTitle,
        deckTitleUpdated: this.props.initialTitle,
        deckTitleUpdatedErrors: [],
        deckInstructions: this.props.instructions,
        deckInstructionsUpdated: this.props.instructions,
        deckInstructionsUpdatedErrors: [],
        deckUserConsideringDeleting: false
      }
    )
  },

  deckSettingsSaved: function() {
    var that = this;
    this.setState({deckSettingsSavedRecently: true});

    window.setTimeout(function() {
      that.setState({deckSettingsSavedRecently: false})
    }, 5000)
  },

  addToFlashes: function(newFlash) {
    var newFlash = newFlash;
    var updatedFlashesArray = _.concat(this.state.flashes, newFlash);
    this.setState({flashes: updatedFlashesArray});

    // remove the flash after its displayed for 7 seconds
    var that = this;
    window.setTimeout(function() {
      that.removeFromFlashes(newFlash);
    }, 5000)
  },

  removeFromFlashes: function(flash) {
    var updatedFlashesArray = _.without(this.state.flashes, flash);
    this.setState({flashes: updatedFlashesArray});
  },

  noErrorsIn: function(response) {
    return(response.errors && response.errors.length === 0)
  },

  handleEditDeckTitle: function(event) {
    this.setState({deckTitleUpdated: event.target.value});
  },

  handleEditDeckInstructions: function(event) {
    this.setState({deckInstructionsUpdated: event.target.value});
  },

  handleDeckUserConsideringDeleting: function() {
    if (this.state.deckUserConsideringDeleting === true) {
      this.setState({deckUserConsideringDeleting: false})
    } else {
      this.setState({deckUserConsideringDeleting: true})
    }
  },

  saveUpdatedDeckSettings: function(event) {
    event.preventDefault();
    var url = '/decks/' + this.props.deckID;

    $.ajax({
      url: url,
      data: {
        deck: {
          title: this.state.deckTitleUpdated,
          instructions: this.state.deckInstructionsUpdated
        }
      },
      method: 'PATCH',
      dataType: 'json',
      success: function(response) {
        if (response.flash === 'Deck updated successfully.') {
          var deck = response.deck;
          this.setState({
            deckTitle: deck.title ,
            deckTitleUpdated: deck.title,
            deckTitleUpdatedErrors: [],

            deckInstructions: deck.instructions,
            deckInstructionsUpdated: deck.instructions,
            deckInstructionsUpdatedErrors: [],
          });
          this.addToFlashes(response.flash);
          this.deckSettingsSaved();
        } else {
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try saving again or refresh the page.");
        }
      }.bind(this),
      error: function(response) {
        debugger
        if (response.status === 422) {
          var errors = response.responseJSON.errors;
          if (errors['title']) {
            this.setState({deckTitleUpdatedErrors: errors['title']});
          }
          if (errors['instructions']) {
            this.setState({deckInstructionsUpdatedErrors: errors['instructions']});
          }
        } else {
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try saving again or refresh the page.")
        }
      }.bind(this)

    });
  },

  addCardToState: function(card, cardType) {
    if (cardType === 'Card') {
      var cards = _.concat(this.state.cards, card);
      this.setState({cards: cards});
    } else if (cardType === 'CardSuggestion') {
      var cards = _.concat(this.state.cardSuggestions, card)
    } else {
      console.log("cardType must be given in addCardToState(). Given cardType: " + cardType);
    }
  },

  removeCardFromState: function(card, cardType) {
    // handleCards
    if (cardType === 'Card') {
      var cards = this.state.cards;
      var updatedCards = _.without(cards, card);
      this.setState({cards: updatedCards})
    // handleCardSuggestions
    } else if (cardType === 'CardSuggestion') {
      var cards = this.state.cardSuggestions;
      var updatedCards = _.without(cards, card);
      this.setState({cardSuggestions: updatedCards});
    } else {
      console.log("cardType must be either 'Card' or 'CardSuggestion' in removeCardFromState(). Given cardType: " + cardType);
    }
  },

  findCardByID: function(cardID) {
    var cards = this.state.cards;
    function findCard(card) { 
      return card.id === cardID;
    }

    return(cards.find(findCard));
  },

  updateCardSuggestion: function(cardSuggestion, status) {
    var url = "/decks/" + this.props.deckID + "/card_suggestions/" + cardSuggestion.id;
    var cardSuggestion = cardSuggestion;
    var that = this;
    var status = status;

    $.ajax(url, {
      method: 'PATCH',
      dataType: 'json',
      data: {
        status: status
      },
      error: function(response) {
        // cardSuggestion.error = "An error updating the card..."
        console.log('An error updating the card...');
      }.bind(this),
      success: function(response) {
          if (that.noErrorsIn(response) && (response.status === "card approval success")) {
            var newlyApprovedCard = response.newlyApprovedCard;

            this.addCardToState(newlyApprovedCard, 'Card');
            this.removeCardFromState(cardSuggestion, 'CardSuggestion');

            this.addToFlashes(newlyApprovedCard.question.substr(0, 30) + "... was approved and added to the deck.");
          } else if (that.noErrorsIn(response) && (response.status === "card rejected success") ) {
            this.removeCardFromState(cardSuggestion, 'CardSuggestion');
            this.addToFlashes(cardSuggestion.question.substr(0, 30) + "... was rejected and will not be added to the deck.")
          } else {
            console.log('Error in updateCardSuggestion(). Response: ');
            console.log(response);
            this.addToFlashes("We're having trouble connecting to Card Pepper. Try again or refresh the page.")
          }
      }.bind(this)
    })
  },

  handleApproveCardSuggestionClick: function(cardSuggestion) {
    this.updateCardSuggestion(cardSuggestion, 'approved');
  },

  handleDeclineCardSuggestionClick: function(cardSuggestion) {
    this.updateCardSuggestion(cardSuggestion, 'rejected');
  },

  handleConsideringDeletingCardClick: function(cardID) {
    var cards = this.state.cards;
    var cardToUpdateIndex = _.findIndex(cards, function(c) { return(c.id === cardID) });
    var card = this.findCardByID(cardID);
    card.consideringDeleting = true;

    if (cardToUpdateIndex === -1) {
      console.log("Card wasn't found in current cards state")
    } else {
      cards[cardToUpdateIndex] = card;
    }

    this.setState({cards: cards})
  },

  handleCancelConsideringDeletingCardClick: function(cardID) {
    var cards = this.state.cards;
    var cardToUpdateIndex = _.findIndex(cards, function(c) { return(c.id === cardID) });
    cards[cardToUpdateIndex].consideringDeleting = false;

    this.setState({cards: cards})
  },

  handleDeleteCard: function(card) {
    var card = card;

    $.ajax('/cards/' + card.id, {
      method: 'DELETE',
      dataType: 'json',
      data: {
        deck_id: this.props.deck_id,
        card: {
          id: card.id
        }
      },
      error: function(response) {
        // ~NewRelic.error(response)
      }.bind(this),
      success: function(response) {
        if (response.id) {
          var cards = _.without(this.state.cards, card);
          this.setState({cards: cards});
        }
      }.bind(this)
    })
  },

  newCard: function() {
    return({
      question:'',
      answer:'',
      questionErrors: [],
      answerErrors: []
    })
  },

  handleDeckEditButtonClick: function(event) {
    this.setState({activeComponent: event })
  },

  handleEditedCardSave: function(cardID) {
    var cardToUpdate = this.findCardByID(cardID);

    // do we still need the url param? or does data work fine? 
    $.ajax('/cards/' + cardToUpdate.id + "&deck_id=" + this.props.deckID, {
      method: 'PATCH',
      dataType: 'json',
      data: {
        deck_id: this.props.deckID,
        card: {
          id: cardToUpdate.id,
          question: cardToUpdate.edited_question,
          answer: cardToUpdate.edited_answer
        }
      },
      error: function(response) {
        console.log('Shoot. There was an error saving the updated card.');
      },
      success: function(response) {
        var responseCard = response;
        var cards = this.state.cards;
        var cardToReplaceIndex = _.findIndex(cards, function(c) { return(c.id === cardID) });

        if (cardToReplaceIndex === -1) {
          console.log("Card wasn't found in current cards state")
        } else {
          cards[cardToReplaceIndex] = responseCard;
        }

        this.setState({cards: cards});
      }.bind(this)
    })
  },

  handleEditCardChange: function(event, card_id, field_name) {
    var cards = this.state.cards;

    // find the card that needs its editing status to be changed
    var card_index = cards.findIndex(
      function(card){
        return(card.id === card_id)
      }
    );

    if (field_name === 'question') {
      cards[card_index].edited_question = event.target.value;
      this.setState({cards: cards});
    } else if (field_name === 'answer') {
      cards[card_index].edited_answer = event.target.value;
      this.setState({cards: cards});
    }
  },

  handleNewCardChange: function(event) {
    if (event.target.placeholder === 'Question') {
      // handle question update
      var newCard = this.state.newCard;
      newCard.question = event.target.value;
      this.setState({newCard: newCard});
    } else if (event.target.placeholder === 'Answer') {
      // handle answer update
      var newCard = this.state.newCard;
      newCard.answer = event.target.value;
      this.setState({newCard: newCard});
    }
  },

  handleNewCardSave: function(event) {
    event.preventDefault();
    $.ajax('/decks/' + this.props.deckID + '/cards', {
      method: 'POST',
      dataType: 'json',
      data: {
        card: {
          question: this.state.newCard.question,
          answer: this.state.newCard.answer
        }
      },
      error: function(response) {
      },
      success: function(response) {
        if (response.id) {
          // handle created card
          var card = response;
          var cards = this.state.cards;
          cards = cards.concat(card);

          this.setState({cards: cards, newCard: this.newCard()});
        }
      }.bind(this)
    })
  },

  handleCancelEditClick: function(event, card_id) {
    var cards = this.state.cards;
    // find the card that needs its editing status to be changed
    var card_index = cards.findIndex(
      function(card){
        return(card.id === card_id)
      }
    );

    // change the individual cards status
    cards[card_index].editing = false;
    cards[card_index].editedQuestion = cards[card_index].question;
    cards[card_index].editedAnswer = cards[card_index].answer;

    this.setState({cards: cards});
  },

  handleEditCardClick: function(event, card_id) {
    var cards = this.state.cards;
    // find the card that needs its editing status to be changed
    var card_index = cards.findIndex(
      function(card){
        return(card.id === card_id)
      }
    );

    // change the individual cards status
    cards[card_index].editing = true;
    this.setState({cards: cards});
  },

  render: function() {
    return(
      <div>
        <DeckTitle
          deckID={this.props.deckID}
          deckTitle={this.state.deckTitle}
          deckEditor={this.props.deckEditor}
          currentUser={this.props.currentUser}
          cards={this.state.cards}
          currentPage={this.props.currentPage}
        />
        <FlashList flashes={this.state.flashes} />
        <DeckEditButtons
          activeComponent={this.state.activeComponent}
          handleDeckEditButtonClick={this.handleDeckEditButtonClick}
          cardSuggestionsCount={this.state.cardSuggestions.length}
        />
        <NewCard
          active={"New Card" === this.state.activeComponent}
          question={this.state.newCard.question}
          onSaveClick={this.handleNewCardSave}
          answer={this.state.newCard.answer}
          onChange={this.handleNewCardChange}
        />
        <CardList
          active={"Card List" === this.state.activeComponent}
          cards={this.state.cards}
          editor={this.props.editor}
          handleCancelConsideringDeletingCardClick={this.handleCancelConsideringDeletingCardClick}
          handleEditedCardSave={this.handleEditedCardSave}
          handleEditCardClick={this.handleEditCardClick}
          handleCancelEditClick={this.handleCancelEditClick}
          handleEditCardChange={this.handleEditCardChange}
          handleConsideringDeletingCardClick={this.handleConsideringDeletingCardClick}
          handleDeleteCard={this.handleDeleteCard}
        />
        <CardSuggestionsList
          active={"Card Suggestions" === this.state.activeComponent}
          cardSuggestions={this.state.cardSuggestions}
          handleApproveCardSuggestionClick={this.handleApproveCardSuggestionClick}
          handleDeclineCardSuggestionClick={this.handleDeclineCardSuggestionClick}
        />
        <DeckSettings
          active={"Deck Settings" === this.state.activeComponent}
          deckSettingsSavedRecently={this.state.deckSettingsSavedRecently}
          deckID={this.props.deckID}

          deckTitle={this.state.deckTitle}
          deckInstructions={this.state.deckInstructions}

          deckTitleUpdated={this.state.deckTitleUpdated}
          deckTitleUpdatedErrors={this.state.deckTitleUpdatedErrors}
          deckInstructionsUpdated={this.state.deckInstructionsUpdated}
          deckInstructionsUpdatedErrors={this.state.deckInstructionsUpdatedErrors}

          deckUserConsideringDeleting={this.state.deckUserConsideringDeleting}
          handleDeckUserConsideringDeleting={this.handleDeckUserConsideringDeleting}

          saveUpdatedDeckSettings={this.saveUpdatedDeckSettings}
          handleEditDeckTitle={this.handleEditDeckTitle}
          handleEditDeckInstructions={this.handleEditDeckInstructions}
        />
      </div>
    )
  }
});