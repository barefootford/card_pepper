DeckEditView = React.createClass({
  getInitialState: function() {
    return(
      {
        activeComponent: 'New Card',
        // these are the options for child components (only one is shown at a time)
        newCard: this.newCard(),
        // server-provided cards
        cards: this.props.cards,
      }
    )
  },

  findCardByID: function(cardID) {
    var cards = this.state.cards;
    function findCard(card) { 
      return card.id === cardID;
    }
    
    return(cards.find(findCard));
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

  handleDeleteCard: function(cardID) {
    $.ajax('/cards/' + cardID, {
      method: 'DELETE',
      dataType: 'json',
      data: {
        deck_id: this.props.deck_id,
        card: {
          id: cardID
        }
      },
      error: function(response) {
        console.log('An error deleting the card...');
      },
      success: function(response) {
        if (response.id) {
          var card = response;
          var cards = this.state.cards;
          var cardToDeleteIndex = _.findIndex(cards, function(c) { return(c.id === card.id) });

          cards[cardToDeleteIndex] = null;
          cards = _.compact(cards);

          this.setState({cards: cards});
        } else {
          // an error we didn't forsee... validations?
        }
      }.bind(this)
    })
  },

  newCard: function() {
    return({question:'', answer:'', questionErrors: [], answerErrors: []})
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

    // cardToUpdate = card.find(card_id)
    // ajax(cardToUpdate)
    // if correct,
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
        console.log('An error');
      },
      success: function(response) {
        if (response.id) {
          // handle created card
          var card = response;
          var cards = this.state.cards;
          cards = cards.concat(card);

          this.setState({cards: cards, newCard: this.newCard()});
        } else {
          // an error we didn't forsee... validations?
          // display errors on this.state.new_card
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
        <DeckEditButtons activeComponent={this.state.activeComponent} handleDeckEditButtonClick={this.handleDeckEditButtonClick} />
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
        <CardSuggestions
          active={"Card Suggestions" === this.state.activeComponent}
        />
      </div>
    )
  }
});