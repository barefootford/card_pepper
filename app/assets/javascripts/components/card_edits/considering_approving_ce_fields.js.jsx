var ConsideringApprovingCEFields = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    approving: React.PropTypes.bool,
    handleChangePendingEditorReply: React.PropTypes.func,
    handleChangeCardEditStatus: React.PropTypes.func
  },

  approveBtnText: function() {
    if (this.props.cardEdit.status === 'approving') {
      return 'approving changes...'
    } else {
      return 'approve changes'
    }
  },

  render: function() {
    var cardEdit = this.props.cardEdit;

    return(
      <div>
        <p>Let user.name know you're going to approve changes:</p>
        <TextArea
          text={cardEdit.pendingEditorReply}
          defaultText="This is a great suggestion. I'm going to approve these changes."
          onChange={this.props.handleChangePendingEditorReply}
          callbackAttributeID={cardEdit.id}
        />

        <XsBtn
          text={this.approveBtnText()}
          onClick={this.props.handleChangeCardEditStatus}
          // change the cardEdit status to approving
          callbackAttribute='approving'
          callbackAttributeId={cardEdit.id}
          primary
        />
        <XsBtn
          text='cancel'
          // hide the cancel button if the user has clicked 'approve changes'
          hidden={(cardEdit.status === 'approving') ? true : false}
          onClick={this.props.handleChangeCardEditStatus}
          // change the cardEdit status to viewing
          callbackAttribute='viewing'
          callbackAttributeId={cardEdit.id}
          additionalClasses='mhm'
        />
      </div>
    )
  }
})