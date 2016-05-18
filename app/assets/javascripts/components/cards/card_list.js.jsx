CardList = React.createClass({
  render: function() {
    if (this.props.active === false) {
      return <div></div>
    } else {
      var that = this;
      var cards = this.props.cards.map(function(card) {
        return <CardRow
                 card={card} key={card.id}
                 handleCancelEditClick={that.props.handleCancelEditClick}
                 handleEditCardClick={that.props.handleEditCardClick}
                 handleEditCardChange={that.props.handleEditCardChange}
                 handleEditedCardSave={that.props.handleEditedCardSave}
                 handleCancelConsideringDeletingCardClick={that.props.handleCancelConsideringDeletingCardClick}
                 handleConsideringDeletingCardClick={that.props.handleConsideringDeletingCardClick}
                 handleDeleteCard={that.props.handleDeleteCard}
               />
      });

      return(
        <div>
          <table className='table table-striped'>
            <tbody>
                <tr>
                  <th>Question & Answer</th>
                  <th>Creator</th>
                  <th>Edit</th>
                </tr>
                {cards}
            </tbody>
          </table>
        </div>
      )
    }
  }
});
