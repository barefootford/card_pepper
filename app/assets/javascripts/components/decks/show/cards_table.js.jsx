Decks.Show.CardsTable = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    cards: React.PropTypes.array.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleCardChange: React.PropTypes.func.isRequired,
    deck: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object
  },

  render: function() {
    if (this.props.active) {
      var that = this;
      var deck = this.props.deck;
      var currentUser = this.props.currentUser;

      var deckEditorIsCurrentUser = (deck.user_id === currentUser.id);

      return(
        <table className='table table-striped'>
          <tbody>
            {
              this.props.cards.map(function(card) {
                return (
                  <Decks.Show.TR.Card
                    key={card.id}
                    card={card}
                    currentUser={that.props.currentUser}
                    deckEditorIsCurrentUser={deckEditorIsCurrentUser}
                    handleChangeCardStatusClick={that.props.handleChangeCardStatusClick}
                    handleCardChange={that.props.handleCardChange}
                  />
                )
              })
            }
          </tbody>
        </table>
      )
    } else {
      return null
    }
  }
});