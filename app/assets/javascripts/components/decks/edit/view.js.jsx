Decks.Edit.View = React.createClass({
  getInitialState: function() {
    return(
      {
        // Use addToFlashes() so flashes are auto removed
        flashes: [],
        activeComponent: 'Card List',
        // Use deckSettingsSaved() so 'recently' is managed.
        deckSettingsSavedRecently: false,

        newCard: this.newCard(),
        // Use ViewHelpers.sortCards()
        cards: this.props.cards,
        cardSuggestions: this.props.cardSuggestions,

        cardEdits: this.props.cardEdits,
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
    this.setState({deckSettingsSavedRecently: true});

    var that = this;
    window.setTimeout(function() {
      that.setState({deckSettingsSavedRecently: false})
    }, 5000)
  },

  addToCardFlash: function(card, flash) {
    var that = this;
    var cards = this.state.cards;
    var card = _.find(cards, {id: card.id});

    cards = _.without(cards, card);

    card = _.merge(card, {flash: flash} );
    this.setState({cards: _.concat(cards, card)});

    window.setTimeout(function() {
      var cards = _.without(that.state.cards, card);
      var cardWithResetFlash = _.merge(card, {flash: ''});
      cards = _.concat(cards, cardWithResetFlash);

      that.setState({cards: cards})
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
            deckTitle: deck.title,
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

  removeAndInsertCard: function(cardToRemove, optionalCardToInsert) {
    var cardsState = this.state.cards;
    var cardsWithoutCardToRemove = _.without(cardsState, cardToRemove);
    var cardsStateWithOptionalCard = _.concat(cardsWithoutCardToRemove, optionalCardToInsert);

    // remove null or undefined optionalCardToInsert with _.compact()
    var newCardsState = _.compact(cardsStateWithOptionalCard);

    this.setState({cards: newCardsState});
  },

  removeAndInsertCardEdit: function(cardEditToRemove, optionalCardEditToInsert) {
    debugger
    var optionalCardGiven = _.isObject(optionalCardEditToInsert);
    var cardEditsState = this.state.cardEdits;
    var cardEditsWithoutCardEditToRemove = _.without(cardEditsState, cardEditToRemove);

    if (optionalCardGiven) {
      var newCardEditsState = _.concat(cardEditsWithoutCardEditToRemove, optionalCardEditToInsert);
    } else {
      var newCardEditsState = cardEditsWithoutCardEditToRemove;
    }

    this.setState({cards: newCardEditsState});
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

          this.addToFlashes(ViewHelpers.standardInternetIsDownMessage);
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

  // I think we already do this server side... So we should just pass in:
  // newCard: @card.serializable_hash
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

  handleSwitchTab: function(event) {
    this.setState({activeComponent: event.target.dataset.callbackAttribute})
  },

  handleSaveEditedCard: function(card) {
    var card = card;

    var answerHasNotChanged = card.edited_answer === card.answer;
    var questionHasNotChanged = card.edited_question === card.question;

    if (answerHasNotChanged && questionHasNotChanged) {
      var allCards = this.state.cards;
      var cardToChange = _.find(allCards, {id: card.id});
      cardToChange.status = 'viewing';
      this.setState({cards: allCards});
      this.addToCardFlash(cardToChange, "No changes to save.");
    } else {
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
    }
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

  handleChangeCardStatusClick: function(event) {
    var cardToChangeId = _.toNumber(event.target.dataset.callbackAttributeId);
    var newStatus = event.target.dataset.callbackAttribute;
    var allCards = this.state.cards;
    var cardToChange = _.find(allCards, {id: cardToChangeId});

    cardToChange.status = newStatus;
    this.setState({cards: allCards});

    if (newStatus === 'DESTROY') {
      this.handleDeleteCard(cardToChange);
    } else if (newStatus === 'saving') {
      this.handleSaveEditedCard(cardToChange);
    } else if (newStatus === 'viewing') {
      // reset the edited question and answer to what is saved
      var resetAttributes = {
        edited_question: cardToChange.question,
        edited_answer: cardToChange.answer,
        questionErrors: [],
        answerErrors: []
      };
      _.assign(cardToChange, resetAttributes);
      this.setState({cards: allCards});
    }
  },

  handleChangeCardEditStatus: function(event) {
    var that = this;
    var allCardEdits = this.state.cardEdits;
    var newCardEditStatus = event.target.dataset.callbackAttribute;

    // _.toNumber isn't for error handing, data- attributes are strings
    var cardEditId = _.toNumber(event.target.dataset.callbackAttributeId);
    var cardEditToChange = _.find(allCardEdits, function(ce) { return ce.id === cardEditId });

    // if the editor wants to switch back to view the cardEdit, clear their pendingEditorReply
    var pendingEditorReply = (newCardEditStatus === 'viewing') ? '' : cardEditToChange.pendingEditorReply

    _.assign(cardEditToChange, {status: newCardEditStatus, pendingEditorReply: pendingEditorReply});
    this.setState({cardEdits: allCardEdits});

    // if cardEdit status is 'approving' or 'declining', make an ajax request
    var statusIsApproving = (cardEditToChange.status === 'approving');
    var statusIsDeclining = (cardEditToChange.status === 'declining');
    var cardEditStatusIsApprovingOrDeclining = (statusIsApproving || statusIsDeclining);
    if (cardEditStatusIsApprovingOrDeclining) {
      window.setTimeout(function() {
        that.updateCardEditOnServer(cardEditToChange);
      }, 500)
    }
  },

  updateCardEditOnServer: function(cardEdit) {
    var cardEdit = cardEdit;
    var cardEditId = cardEdit.id;
    var that = this;

    // Enum statuses in CardEdit.rb:
    // pending: 0, declined: 1, approved: 2
    if (cardEdit.status === 'declining') {
      var serverCardEditStatus = 'declined'
    } else if (cardEdit.status === 'approving') {
      var serverCardEditStatus = 'approved'
    } else {
      var serverCardEditStatus = 'pending'
    }

    $.ajax({
      url: '/card_edits/' + cardEdit.id,
      data: {
        deck_id: this.props.deckID,
        card_id: cardEdit.card_id,
        card_edit_id: cardEdit.id,
        editor_response: cardEdit.pendingEditorReply,
        status: serverCardEditStatus
      },
      method: 'PATCH',
      dataType: 'json',
      success: function(response) {
        var savedCardEdit = response.data.cardEdit
        var savedCard = response.data.card;

        var clientCardEditToRemove = _.find(this.state.cardEdits, {id: savedCardEdit.id});
        var clientCardToRemove = _.find(this.state.cards, {id: savedCard.id});

        if (savedCardEdit.status === 'approved') {
          this.removeAndInsertCard(clientCardToRemove, savedCard);
          this.setState({cardEdits: _.without(this.state.cardEdits, clientCardEditToRemove)});
        } else if (savedCardEdit.status === 'declined') {
          this.setState({cardEdits: _.without(this.state.cardEdits, clientCardEditToRemove)});
        }
      }.bind(this),
      error: function(response) {
        // we don't really deal with failed validations, but the only thing that could
        // easily fail is offline internet or an editor response that's too long (max is 5000)
        // I dont think that will happen often, so we can save better error handling for later.

        // Reset cards that may be failing/hanging because internet is down
        var cardEditsState = this.state.cardEdits;
        function revertFailingStates(cardEdit) {
          if (cardEdit.status === 'approving') {
            cardEdit.status = 'consideringApproving';
            cardEdit.flash = ViewHelpers.standardInternetIsDownMessage;
          } else if (cardEdit.status === 'declining') {
            cardEdit.status = 'consideringDeclining';
            cardEdit.flash = ViewHelpers.standardInternetIsDownMessage;
          }
          return cardEdit
        }

        var newCardEditsState = _.map(cardEditsState,revertFailingStates);
        this.setState({cardEdits: newCardEditsState});

      }.bind(this)
    });
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
        <DecksEditTabs
          activeComponent={this.state.activeComponent}
          cardSuggestionsCount={this.state.cardSuggestions.length}
          cardsCount={this.state.cards.length}

          handleSwitchTab={this.handleSwitchTab}
        />
        <NewCard
          active={'New Card' === this.state.activeComponent}
          card={this.state.newCard}

          onSaveClick={this.handleNewCardSave}
          onChange={this.handleNewCardChange}
        />
        <Decks.Edit.CardTable
          active={'Card List' === this.state.activeComponent}
          cards={ViewHelpers.sortCards(this.state.cards)}

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