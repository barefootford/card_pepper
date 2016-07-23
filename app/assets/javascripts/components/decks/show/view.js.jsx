Decks.Show.View = React.createClass({
  getInitialState: function() {
    return {
      activeComponent: 'Card List',
      cards: this.props.cards,
      cardSuggestions: this.props.cardSuggestions,
      cardEdits: this.props.cardEdits,
      newCardSuggestion: {}
    }
  },

  handleCardChange: function(event, card, attributeName ) {
    var allCards = this.state.cards;
    var cardToChange = _.find(allCards, {id: card.id});

    // cardToChange.edited_question or card.edited_answer
    cardToChange[attributeName] = event.target.value.substr(0, 140);

    this.setState({cards: allCards});
    // CardEdits are children of cards. So a card edit
    // question and answer is part of a card until we
    // create the cardEdit on the server.
  },

  addToCardFlash: function(card, flash) {
    // this whole function needs to use the immutable data helper, update()
    var that = this;
    var allCards = this.state.cards;
    var cardToReceiveFlash = _.find(allCards, {id: card.id});

    var cardsArrayWithoutCardToReceiveFlash = _.without(allCards, cardToReceiveFlash);
    var cardWithUpdatedFlash = _.assign(cardToReceiveFlash, {flash: flash});

    var newCardsState = cardsArrayWithoutCardToReceiveFlash.concat([cardWithUpdatedFlash]);
    this.setState({cards: newCardsState});

    window.setTimeout(function() {
      var allCards = that.state.cards;
      var cardToRemoveFlash  = _.find(allCards, {id: cardWithUpdatedFlash.id});
      var allCards = _.without(allCards, cardToRemoveFlash);

      var cardWithRemovedFlash = _.assign(cardToRemoveFlash, { flash:''});
      var newCardsState = _.concat(allCards, cardWithRemovedFlash);

      that.setState({cards: newCardsState});
    }, 5000)
  },

  createCardEdit: function(card) {
    var card = card;

    $.ajax({
      url: '/card_edits',
      method: 'POST',
      data: {
        card_edit: {
          question: card.edited_question,
          answer: card.edited_answer,
          card_id: card.id,
          reason: card.reason
        }
      },
      dataType: 'json',
      success: function(response) {
        // Receive the new Card Edit and add it to already saved Card Edits Array
        var savedCardEdit = response;
        var allCardEdits = this.state.cardEdits;
        var newCardEditsState = _.concat(allCardEdits, savedCardEdit);

        // Reset the card that the user was suggesting an edit with
        // Notify the user it's been added to public card edits.
        var allCards = this.state.cards;
        var cardToReset = _.find(allCards, {id: card.id})
        var allCards = _.without(allCards, cardToReset)
        var resetAttributes = {
          status: 'viewing',
          edited_question: cardToReset.question,
          edited_answer: cardToReset.answer
        };
        var resetCard = _.assign(cardToReset, resetAttributes);
        var newCardsState = _.concat(allCards, resetCard);

        this.setState({cards: newCardsState, cardEdits: newCardEditsState});
        this.addToCardFlash(resetCard, "Your recommended change has been sent to the Deck's Editor. You can see the card listed publicly under Pending Card Edits.");
      }.bind(this),
      error: function(response) {
        // Users won't see an error unless they bypass client side validations
        // with dev tools or something. So...
      }.bind()
    });
  },

  handleChangeCardStatusClick: function(event) {
    var cardToChangeId = _.toNumber(event.target.dataset.callbackAttributeId);
    var newStatus = event.target.dataset.callbackAttribute;
    var allCards = this.state.cards;
    var cardToChange = _.find(allCards, {id: cardToChangeId});

    cardToChange.status = newStatus;

    if (cardToChange.status === 'viewing') {
      var resetAttributes = {
        edited_question: cardToChange.question,
        edited_answer: cardToChange.answer
      };
      _.assign(cardToChange, resetAttributes)
    } else if (cardToChange.status === 'CREATE') {
      this.createCardEdit(cardToChange);
    }

    this.setState({cards: allCards});
  },

  handleSwitchTab: function(event) {
    this.setState({activeComponent: event.target.dataset.callbackAttribute});
  },

  render: function() {
    return (
      <div>
        <br/>
        <hr/>

        <Decks.Show.Tabs
          activeComponent={this.state.activeComponent}
          handleSwitchTab={this.handleSwitchTab}
          cardSuggestions={this.state.cardSuggestions}
          cards={this.state.cards}
          cardEdits={this.state.cardEdits}
        />

        <Decks.Show.CardsTable
          deck={this.props.deck}
          active={this.state.activeComponent === 'Card List'}
          cards={ViewHelpers.sortCards(this.state.cards)}
          currentUser={this.props.currentUser}
          handleChangeCardStatusClick={this.handleChangeCardStatusClick}
          handleCardChange={this.handleCardChange}
        />

        <Decks.Show.PendingCardSuggestionsTable
          deck={this.props.deck}
          active={this.state.activeComponent === "New Card Suggestions"}
          cardSuggestions={ViewHelpers.sortCards(this.state.cardSuggestions)}
        />

        <Decks.Show.CardEditsTable
          active={this.state.activeComponent === 'Card Edits'}
          cards={ViewHelpers.sortCards(this.state.cards)}
          cardEdits={this.state.cardEdits}
        />
        <Decks.ContributorsTab
          active={this.state.activeComponent === 'Contributors'}
          deckId={this.props.deck.id}
        />
      </div>
    )
  }
});