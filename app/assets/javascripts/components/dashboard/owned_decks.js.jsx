var OwnedDecks = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    ownedDecks: React.PropTypes.array.isRequired
  },

  render: function() {
    var ownedDecks = this.props.ownedDecks;
    var anyOwnedDecks = ownedDecks.length > 0;
    var currentUser = this.props.currentUser;

    if (anyOwnedDecks) {
      return (
        <div>
          <QuietLabel text="Decks you own:"/>
          {
            _.map(ownedDecks, function(deck) {
              // because these are the current users owned decks
              var deckEditor = currentUser;
              return  <DashboardDeckTitle
                        key={deck.id}
                        currentUser={currentUser}
                        deck={deck}
                        deckEditor={deckEditor}
              />
            })
          }
        </div>
      )
    } else {
      return null
    }
  }
})
        