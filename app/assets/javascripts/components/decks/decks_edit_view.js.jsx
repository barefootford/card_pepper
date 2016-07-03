DecksEditView = React.createClass({
  getInitialState: function() {
    return(
      {
        // Use addToFlashes() so flashes are auto removed
        flashes: [],
        activeComponent: 'Card List',
        // Use deckSettingsSaved() so 'recently' is managed.
        deckSettingsSavedRecently: false,

        newCard: this.newCard(),
        // Use sortedCards()
        cards: this.props.cards,
        cardSuggestions: this.props.cardSuggestions,

        cardEdits: [
          {
            id: 1,
            card_id: 1,
            name: 'Andrew Ford',
            status: 'viewing',
            savedCardQuestion: 'I want to eat',
            proposedCardQuestion: 'I really want to eat',
            savedCardAnswer: 'Quero comer',
            proposedCardAnswer: 'Muy quero comer',
            pendingEditorReply: ''
          },
          {
            name: 'Andrew Ford',
            id: 2,
            status: 'viewing',
            savedCardQuestion: 'I want',
            proposedCardQuestion: 'I wanna',
            savedCardAnswer: '',
            proposedCardAnswer: '',
            pendingEditorReply: ''
          },
          {
            name: 'Andrew Ford',
            id: 3,
            status: 'viewing',
            savedCardQuestion: 'Kerry Kerry',
            proposedCardQuestion: 'Kailey Kelley',
            savedCardAnswer: '',
            proposedCardAnswer: '',
            pendingEditorReply: ''
          }
        ],
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

  addToCardFlash: function(card, flash) {
    var that = this;
    var cards = this.state.cards;
    var card = card;
    cards = _.without(cards, card);

    card = _.merge(card, {flash: flash} );
    this.setState({cards: _.concat(cards, card)});

    window.setTimeout(function() {
      var cards = _.without(that.state.cards, card);
      var cardWithResetFlash = _.merge(card, {flash: ''});
      cards = _.concat(cards, cardWithResetFlash);

      that.setState({cards: cards})
    }, 3000)
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

  handleChangePendingEditorReply: function(event) {
    var allCardEdits = this.state.cardEdits
    var cardEditId = _.toNumber(event.target.dataset.callbackAttributeId)
    var cardEditToChange = _.find(allCardEdits, function(ce) { return ce.id === cardEditId });

    var newTextValue = event.target.value
    _.assign(cardEditToChange, {pendingEditorReply: newTextValue})

    this.setState({cardEdits: allCardEdits})
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
      answerErrors: [],
      flash: '',
      status: 'editing'
    }
  },

  handleSwitchTab: function(tabName) {
    this.setState({activeComponent: tabName })
  },

  handleSaveEditedCard: function(card) {
    var card = card;

    // do we still need the url param? or does data work fine?
    // Lets look after everything works again...!!!!!!!!!!!!!!!!!!!!!!!!!
    $.ajax('/cards/' + card.id + '&deck_id=' + this.props.deckID, {
      method: 'PATCH',
      dataType: 'json',
      data: {
        deck_id: this.props.deckID,
        card: {
          id: card.id,
          question: card.edited_question,
          answer: card.edited_answer
        }
      },
      error: function(response) {
        if (response.status === 422) {
          var responseErrors = response.responseJSON;
          var cardAttributes = {
            questionErrors: _.get(responseErrors, 'question', []),
            answerErrors: _.get(responseErrors, 'answer', []),
            status: 'editing'
          };
          var cards = _.without(this.state.cards, card);
          var cardWithErrors = _.assign(card, cardAttributes);
          var allDeckCards = _.concat(cards, cardWithErrors);

          this.setState({cards: allDeckCards});
        } else {
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try saving the new card again or refresh the page.");
        }
      }.bind(this),
      success: function(response) {
        var savedCard = response;
        var cards =  _.without(this.state.cards, card);
        var allDeckCards = _.concat(cards, savedCard);

        this.setState({cards: allDeckCards});
        this.addToCardFlash(savedCard, 'Card saved.');
      }.bind(this)
    })
  },

  handleEditCardChange: function(event, card, fieldName) {
    var cards = _.without(this.state.cards, card);
    var editedCard = card;

    if (fieldName === 'edited_question') {
      editedCard = _.merge(card, { edited_question: event.target.value });
    } else if (fieldName === 'edited_answer') {
      editedCard = _.merge(card, { edited_answer: event.target.value });
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

    var newAttributes = {
      status: 'saving'
    }
    var newCard = _.assign(this.state.newCard, newAttributes);
    this.setState({newCard: newCard});

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
        if (response.status === 422) {
          var response = response.responseJSON;
          var attributes = {
            questionErrors: _.get(response, 'question', []),
            answerErrors: _.get(response, 'answer', []),
            status: 'editing'
          };
          var newCard = _.assign(this.state.newCard, attributes);

          this.setState({newCard: newCard});
        } else {
          this.addToFlashes("We're having trouble connecting to Card Pepper. Try saving the new card again or refresh the page.");
        }
      }.bind(this),
      success: function(response) {
        if (response.id) {
          var newCard = response;
          var savedCards = this.state.cards;
          savedCards = savedCards.concat(newCard);

          this.setState({cards: savedCards, newCard: this.newCard()});
          this.addToFlashes(newCard.question.substr(0, 50) + "..." + " has been saved and added to the deck.");
        }
      }.bind(this)
    })
  },

  handleChangeCardStatusClick: function(card, newStatus) {
    var cards = _.without(this.state.cards, card);
    card.status = newStatus;
    this.setState({cards: cards.concat(card)});

    if (newStatus === 'DESTROY') {
      this.handleDeleteCard(card);
    } else if (newStatus === 'saving') {
      this.handleSaveEditedCard(card);
    } else if (newStatus === 'viewing') {
      // reset the edited question and answer to what is saved on server
      var cards = _.without(cards, card);
      var resettedAttributes = {
        edited_question: card.question,
        edited_answer: card.answer,
        questionErrors: [],
        answerErrors: []
      };
      var cardWithResettedAttributes = _.assign(card, resettedAttributes);
      var cards = _.concat(cards, cardWithResettedAttributes);

      this.setState({cards: cards});
    }
  },

  handleChangeCardEditStatus: function(event) {
    var allCardEdits = this.state.cardEdits;
    var newCardEditStatus = event.target.dataset.callbackAttribute;
    var cardEditId = _.toNumber(event.target.dataset.callbackAttributeId)
    var cardEditToChange = _.find(allCardEdits, function(ce) { return ce.id === cardEditId });

    // if the user switches back to view the cardEdit, clear their response
    var pendingEditorReply = (newCardEditStatus === 'viewing') ? '' : cardEditToChange.pendingEditorReply

    _.assign(cardEditToChange, {status: newCardEditStatus, pendingEditorReply: pendingEditorReply});
    this.setState({cardEdits: allCardEdits});

    if (cardEditToChange.status === 'approving') {
      console.log("CardEdit set to approving... now we need some ajax.")
      // this.ajaxUpdateCardEdit
    } else if (cardEditToChange.status === 'declining'){
      console.log("CardEdit set to declining... now we need some ajax.")
      // this.ajaxUpdateCardEdit
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
          handleEditCardChange={this.handleEditCardChange}
        />
        <CommunitySuggestionsList
          active={'Community Suggestions' === this.state.activeComponent}
          cardSuggestions={this.state.cardSuggestions}
          cards={this.state.cards}
          cardEdits={this.state.cardEdits}

          handleChangePendingEditorReply={this.handleChangePendingEditorReply}
          handleChangeCardEditStatus={this.handleChangeCardEditStatus}
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