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
                  <th>Creator</th>
                  <th>Edit</th>
                </tr>
                {
                  this.props.cards.map(function(card) {
                    return (
                      <CardRow
                        card={card} key={card.id}
                        handleCancelEditClick={callbacks.handleCancelEditClick}
                        handleEditCardClick={callbacks.handleEditCardClick}
                        handleEditCardChange={callbacks.handleEditCardChange}
                        handleEditedCardSave={callbacks.handleEditedCardSave}
                        handleCancelConsideringDeletingCardClick={callbacks.handleCancelConsideringDeletingCardClick}
                        handleConsideringDeletingCardClick={callbacks.handleConsideringDeletingCardClick}
                        handleDeleteCard={callbacks.handleDeleteCard}
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
