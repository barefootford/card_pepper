var CardEditRow = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    username: React.PropTypes.string.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired,
    handleChangePendingEditorReply: React.PropTypes.func.isRequired
  },

  render: function() {
    var card = this.props.card;
    var cardEdit = this.props.cardEdit;

    if (cardEdit.status === 'declined' || cardEdit.status === 'approved') {
      return null
    } else {
      return (
        <tr key={cardEdit.id}>
          <td>
            <CardEditDiff
              label={'question'}
              areChanges={cardEdit.question !== card.question }
              before={card.question}
              after={cardEdit.question}
            />
            <hr/>
            <CardEditDiff
              label={'answer'}
              areChanges={cardEdit.answer !== card.answer}
              before={card.answer}
              after={cardEdit.answer}
            />

            <CardEditReason reason={cardEdit.reason}/>

            <CardEditRowFields
              cardEdit={cardEdit}
              handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
              handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
            />
            <CardRowFlash flash={cardEdit.flash} />
            <br/>
          </td>
        </tr>
      )
    }
  }
});
