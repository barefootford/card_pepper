var CardEditRow = React.createClass({
  propTypes: {
    cardEdit: React.PropTypes.object.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired,
    handleChangePendingEditorReply: React.PropTypes.func.isRequired
  },

  render: function() {
    var cardEdit = this.props.cardEdit;
    var card = this.props.card;

    return (
      <tr key={cardEdit.id}>
        <td>
          <p>user.name wants to make changes to a card:</p>
          <CardEditDiff
            // hide unless the proposed question is different from existing question.
            // the user can propose a different question, answer, or both.
            label={'question'}
            active={cardEdit.proposedCardQuestion !== card.question }
            before={card.question}
            after={cardEdit.proposedCardQuestion}
          />
          <CardEditDiff
            // hide unless the proposed answer is different from existing answer.
            // the user can propose a different question, answer, or both.
            label={'answer'}
            active={cardEdit.proposedCardAnswer !== card.answer}
            before={cardEdit.savedCardAnswer}
            after={cardEdit.proposedCardAnswer}
          />

          <CardEditRowFields
            cardEdit={cardEdit}
            handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
            handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
          />
          <br/>
        </td>
      </tr>
    )
  }
});
