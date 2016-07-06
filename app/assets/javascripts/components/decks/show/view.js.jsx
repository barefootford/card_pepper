Decks.Show.View = React.createClass({
  getInitialState: function() {
    return {
      activeComponent: 'Card List',
      cards: this.props.cards,
      cardSuggestions: [], //this.props.cardSuggestions,
      cardEdits: [],
      newCardSuggestion: {
      },
    }
  },

  handleCardChange: function(event, card, attributeName ) {
    var allCards = this.state.cards;
    var cardToChange = _.find(allCards, {id: card.id});
    cardToChange[attributeName] = event.target.value.substr(0, 140);

    this.setState({cards: allCards})
    // CardEdits are children of cards. So a card edit
    // question and answer is part of a card until we
    // create the cardEdit on the server.
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
      }
      _.assign(cardToChange, resetAttributes)
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

        <Decks.Show.CardTable
           active={this.state.activeComponent === 'Card List'}
           cards={this.state.cards}
           currentUser={this.props.currentUser}
           handleChangeCardStatusClick={this.handleChangeCardStatusClick}
           handleCardChange={this.handleCardChange}
         />
      </div>
    )
  }
})