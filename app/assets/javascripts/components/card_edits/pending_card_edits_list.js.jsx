var PendingCardEditsList = React.createClass({
  render: function() {
    return(
      <div>
        <h5>Pending Card Edits:</h5>
        <table className='table table-striped table-hover'>
          <tbody>
            <tr key={'tableHeaderKey'}>
              <th>Question & Answer</th>
            </tr>
            {
              this.props.cardEdits.map(function(cardEdit) {
                var card = this.props.cards[0]
                // var card = _.find(this.props.cards, {id: cardEdit.card_id});
                // find the parent card of the CardEdit

                return (
                  <CardEditRow
                    key={cardEdit.id}
                    card={card}
                    cardEdit={cardEdit}

                    handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
                    handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
                  />
                )
              }.bind(this))
            }
          </tbody>
        </table>
      </div>
    )
  }
})