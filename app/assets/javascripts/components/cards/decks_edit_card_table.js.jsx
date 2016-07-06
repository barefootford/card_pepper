var DecksEditCardTable = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    cards: React.PropTypes.array.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleEditCardChange: React.PropTypes.func.isRequired
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
                    <CardRow
                      key={card.id}
                      card={card}
                      handleChangeCardStatusClick={that.props.handleChangeCardStatusClick}
                      handleEditCardChange={that.props.handleEditCardChange}
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
