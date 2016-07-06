Decks.Show.CardTable = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    cards: React.PropTypes.array.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleCardChange: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object
  },

  render: function() {
    if (this.props.active) {
      var that = this;

      return(
        <table className='table table-striped'>
          <tbody>
              <tr key={"tableHeaderRow"}>
                <th>Question & Answer</th>
              </tr>
              { 
                this.props.cards.map(function(card) {
                  return (
                    <Decks.Show.TR.Card
                      key={card.id}
                      card={card}
                      currentUser={that.props.currentUser}
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