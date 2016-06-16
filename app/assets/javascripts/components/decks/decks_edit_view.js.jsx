DecksEditView = React.createClass({
  getInitialState: function() {
    return(
      {
        // Use addToFlashes() so flashes are auto removed
        flashes: [],
        activeComponent: 'New Card',
        // Use deckSettingsSaved() so 'recently' is managed.
        deckSettingsSavedRecently: false,

        newCard: this.newCard(),
        // Use sortedCards()
        cards: this.props.cards,
        cardSuggestions: this.props.cardSuggestions,

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

  sortedCards: function() {
    return _.sortBy(this.state.cards, function(c) { return c.id })
  },

  deckSettingsSaved: function() {
    this.setState({deckSettingsSavedRecently: true});

    var that = this;
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

  addCardToState: function(card) {
    this.setState({cards: _.concat(this.state.cards, card)});
  },

  removeCardSuggestionFromState: function(card) {
    this.setState({cardSuggestions: _.without(this.state.cardSuggestions, cardSuggestion)});
  },

  findCardByID: function(cardID) {
    var cards = this.state.cards;
    function findCard(card) { 
      return card.id === cardID;
    }

    return(cards.find(findCard));
  },

  updateCardSuggestion: function(cardSuggestion, status) {
    var url = '/decks/' + this.props.deckID + '/card_suggestions/' + cardSuggestion.id;
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
        console.log('An error updating the card...');
      }.bind(this),
      success: function(response) {
        if (that.noErrorsIn(response) && (response.status === 'card approval success')) {
          var newlyApprovedCard = response.newlyApprovedCard;

          this.setState({cards: _.concat(this.state.cards, newlyApprovedCard)});
          this.setState({cardSuggestions: _.without(this.state.cardSuggestions, cardSuggestion)});
          this.addToFlashes(newlyApprovedCard.question.substr(0, 30) + '... was approved and added to the deck.');
        } else if (that.noErrorsIn(response) && (response.status === 'card rejected success') ) {
          this.setState({cardSuggestions: _.without(this.state.cardSuggestions, cardSuggestion)});
          this.addToFlashes(cardSuggestion.question.substr(0, 30) + '... was rejected and will not be added to the deck.');
        } else {
          console.log('Error in updateCardSuggestion(). Response: ');
          console.log(response);
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try again or refresh the page.");
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
        this.handleChangeCardStatusClick(card, 'DESTROYFAILED');
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
    return {
      question:'',
      answer:'',
      questionErrors: [],
      answerErrors: []
    }
  },

  handleSwitchTab: function(tabName) {
    this.setState({activeComponent: tabName })
  },

  handleEditedCardSave: function(cardID) {
    var cardToUpdate = this.findCardByID(cardID);

    // do we still need the url param? or does data work fine? 
    $.ajax('/cards/' + cardToUpdate.id + '&deck_id=' + this.props.deckID, {
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
        console.log('There was an error saving the updated card.');
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

  handleEditCardChange: function(event, card, fieldName) {
    var cards = _.without(this.state.cards, card);

    if (fieldName === 'question') {
      var editedCard = _.merge(card, { question: event.target.value });
    } else if (fieldName === 'answer') {
      var editedCard = _.merge(card, { answer: event.target.value });
    }

    this.setState({cards: _.concat(cards, editedCard) });
  },

  handleNewCardChange: function(event) {
    if (event.target.placeholder === 'Question') {
      var newCard = this.state.newCard;

      newCard.question = event.target.value.substr(0, 140);
      this.setState({newCard: newCard});
    } else if (event.target.placeholder === 'Answer') {
      var newCard = this.state.newCard;

      newCard.answer = event.target.value.substr(0, 140);
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
        var response = response.responseJSON;

        if ( _.has(response.errors, 'answer','question') ) {
          var newCard = this.state.newCard;
          var cardErrors = {
            questionErrors: response.errors.question,
            answerErrors: response.errors.answer
          };

          newCard = _.assign(newCard, cardErrors);
          this.setState({newCard: newCard});
        } else {
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try saving the new card again or refresh the page.");
        }
      }.bind(this),
      success: function(response) {
        if (response.id) {
          // handle created card
          var card = response;
          var cards = this.state.cards;
          cards = cards.concat(card);

          this.setState({cards: cards, newCard: this.newCard()});
          this.addToFlashes(card.question.substr(0, 50) + "..." + " has been saved and added to the deck.");
        }
      }.bind(this)
    })
  },

  handleChangeCardStatusClick: function(card, newStatus) {
    if (newStatus === 'DESTROY') {
      this.handleDeleteCard(card);
    } else {
      var cards = _.without(this.state.cards, card);
      card.status = newStatus;
      this.setState({cards: cards.concat(card)});
    }
  },

  deckTitleData: function() {
    return {
      deckID: this.props.deckID,
      deckTitle: this.state.deckTitle,
      deckEditor: this.props.deckEditor,
      currentUser: this.props.currentUser,
      cards: this.state.cards,
      currentPage: this.props.currentPage
    }
  },

  deckSettingsData: function() {
    return {
      // maybe remove all these deck labels
      id: this.props.deckID,
      componentActive: ('Deck Settings' === this.state.activeComponent),
      settingsSavedRecently: this.state.deckSettingsSavedRecently,
      titleUpdated: this.state.deckTitleUpdated,
      titleUpdatedErrors: this.state.deckTitleUpdatedErrors,
      instructionsUpdated: this.state.deckInstructionsUpdated,
      instructionsUpdatedErrors: this.state.deckInstructionsUpdatedErrors,
      deckUserConsideringDeleting: this.state.deckUserConsideringDeleting
    }
  },

  render: function() {
    return(
      <div>
        <DeckTitle
          data={this.deckTitleData()}
        />
        <FlashList flashes={this.state.flashes} />
        <DeckEditTabs
          activeComponent={this.state.activeComponent}
          cardSuggestionsCount={this.state.cardSuggestions.length}

          handleSwitchTab={this.handleSwitchTab}
        />
        <NewCard
          active={'New Card' === this.state.activeComponent}
          card={this.state.newCard}

          onSaveClick={this.handleNewCardSave}
          onChange={this.handleNewCardChange}
        />
        <CardList
          active={'Card List' === this.state.activeComponent}
          cards={this.sortedCards()}

          handleChangeCardStatusClick={this.handleChangeCardStatusClick}
          handleEditedCardSave={this.handleEditedCardSave}
          handleEditCardChange={this.handleEditCardChange}
        />
        <CardSuggestionsList
          active={'Card Suggestions' === this.state.activeComponent}
          cardSuggestions={this.state.cardSuggestions}

          handleApproveCardSuggestionClick={this.handleApproveCardSuggestionClick}
          handleDeclineCardSuggestionClick={this.handleDeclineCardSuggestionClick}
        />
        <DeckSettings
          deckSettingsData={this.deckSettingsData()}

          handleDeckUserConsideringDeleting={this.handleDeckUserConsideringDeleting}
          saveUpdatedDeckSettings={this.saveUpdatedDeckSettings}
          handleEditDeckTitle={this.handleEditDeckTitle}
          handleEditDeckInstructions={this.handleEditDeckInstructions}
        />
      </div>
    )
  }
});