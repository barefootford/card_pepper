var CardEditRowFields = React.createClass({
  propTypes: {
    cardEdit: React.PropTypes.object.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired,
    handleChangePendingEditorReply: React.PropTypes.func.isRequired
  },

  style: {
    color: '#7b8996'
  },

  render: function() {
    var cardEdit = this.props.cardEdit;

    if (cardEdit.status === 'viewing' || cardEdit.status === 'pending') {
      return <Decks.Edit.ViewingCEFields
        style={this.style}
        cardEdit={this.props.cardEdit}
        handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
      />
    } else if (cardEdit.status === 'consideringDeclining') {
      return <ConsideringDecliningCEFields
        style={this.style}
        cardEdit={this.props.cardEdit}
        handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
        handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
      />
    } else if (cardEdit.status === 'consideringApproving') {
      return <ConsideringApprovingCEFields
        style={this.style}
        cardEdit={this.props.cardEdit}
        handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
        handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
      />
    } else if (cardEdit.status === 'declining') {
      // Declining uses same fields as consideringDeclining
      // status, but with a button that shows we are declining(sending to server)
      return <ConsideringDecliningCEFields
        style={this.style}
        cardEdit={this.props.cardEdit}
        handleChangeCardEditStatus={doNothing}
        handleChangePendingEditorReply={doNothing}
      />
    } else if (cardEdit.status === 'approving') {
      // Approving uses same fields as consideringApproving
      // status, but with a button that shows we are approving (sending to server)
      // Use the approving boolean attribute.
      return <ConsideringApprovingCEFields
        style={this.style}
        cardEdit={this.props.cardEdit}
        handleChangeCardEditStatus={doNothing}
        handleChangePendingEditorReply={doNothing}
      />
    } else {
      return null
    }
  }
})
