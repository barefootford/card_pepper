var DeckFavBtn = React.createClass({
  propTypes: {
    deck: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    createDeckFavorite: React.PropTypes.func.isRequired,
    destroyDeckFavorite: React.PropTypes.func.isRequired
  },

  isAFavoritedDeck: function() {
    var currentUser = this.props.currentUser;
    var deck = this.props.deck;

    return _.includes(currentUser.deckFavoritesIds, deck.id)
  },

  render: function() {
    var currentUser = this.props.currentUser
    var deckId = this.props.deckId;
    var noCurrentUser = _.isObject(currentUser) === false


    if (noCurrentUser) {
      return null
    } else if (currentUser.updatingDeckFavorites) {
      return(
        <span
          className='btn btn-xs btn-default disabled mhm'
          onClick={doNothing}
        >
          <span
            style={{color: 'rgba(231,76,43,0.5)'}}
            className="fui-heart"
          />
          {" updating..."}
        </span>
      )
    } else if (this.isAFavoritedDeck()) {
        return(
          <span
            className='btn btn-xs btn-inverse mhm'
            onClick={this.props.destroyDeckFavorite}
          > {' You '}
            <span
              style={{color: '#e74c3c'}}
              className="fui-heart"
            />
            {" this deck"}
          </span>
        )
    } else {
      return(
        <span
          className='btn btn-xs btn-default mhm'
          onClick={this.props.createDeckFavorite}
        >
          <span
            style={{color: '#ffffff'}}
            className="fui-heart"
          />
          {" follow"}
        </span>
      )
    }
  }
});