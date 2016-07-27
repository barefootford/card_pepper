var FavoritedDecks = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    favoritedDecks: React.PropTypes.array.isRequired,
    favoritedDecksEditors: React.PropTypes.array.isRequired
  },

  render: function() {
    var favoritedDecks = this.props.favoritedDecks;
    var anyFavoritedDecks = favoritedDecks.length > 0;
    var favoritedDecksEditors = this.props.favoritedDecksEditors;
    var currentUser = this.props.currentUser;

    if (anyFavoritedDecks) {
      return (
        <div>
          <QuietLabel text={'Decks you <3 and contribute to:'}/>
          {
            _.map(favoritedDecks, function(deck) {
              var deckEditor = _.find(favoritedDecksEditors, {id: deck.user_id});
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
      return (
        <div>
          <QuietLabel text='Decks you <3 and contribute to:'/>
          <small>{"<3"} decks and they'll show up here so you can follow them easily.</small>
        </div>
      )
    }
  }
});
