CardList = React.createClass({
  render: function() {
    if (this.props.active === true) {
      var callbacks = this.props.callbacks;
      var that = this;

      return(
        <div>
          <table className='table table-striped'>
            <tbody>
                <tr>
                  <th>Question & Answer</th>
                </tr>
                {
                  this.props.cards.map(function(card) {
                    return (
                      <CardRow
                        card={card} key={card.id}
                        handleChangeCardStatusClick={that.props.handleChangeCardStatusClick}
                        handleEditCardChange={that.props.handleEditCardChange}
                        handleEditedCardSave={that.props.handleEditedCardSave}
                      />
                    )
                  })
                }
            </tbody>
          </table>
        </div>
      )
    } else {
      return null
    }
  }
});
