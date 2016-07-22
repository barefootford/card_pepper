Decks.Edit.PendingCardEditsTable = React.createClass({
  propTypes: {
    cardEdits: React.PropTypes.array.isRequired,
    cards: React.PropTypes.array.isRequired,
    handleChangePendingEditorReply: React.PropTypes.func.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired
  },

  render: function() {
    var that = this;

    if (this.props.cardEdits.length > 0) {
      return (
        <table className='table table-striped table-hover'>
          <tbody>
            <tr key={'tableHeaderKey'}>
              <th>Pending Card Edits</th>
            </tr>
            {
              this.props.cardEdits.map(function(cardEdit) {
                // find the parent card of the CardEdit so they can be diffed against each other
                var card = _.find(that.props.cards, {id: cardEdit.card_id});

                return (
                  <CardEditRow
                    key={cardEdit.id}
                    card={card}
                    cardEdit={cardEdit}
                    username={card.user_name}

                    handleChangeCardEditStatus={that.props.handleChangeCardEditStatus}
                    handleChangePendingEditorReply={that.props.handleChangePendingEditorReply}
                  />
                )
              })
            }
          </tbody>
        </table>
      )
    } else {
      return (
        <table className='table table-striped table-hover'>
          <tbody>
            <tr key={'tableHeaderKey'}>
              <th>Pending Card Edits</th>
            </tr>
            <tr>
              <td>No card edits to approve.</td>
            </tr>
          </tbody>
        </table>
      )
    }
  }
});
