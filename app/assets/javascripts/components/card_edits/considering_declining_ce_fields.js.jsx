var ConsideringDecliningCEFields = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    handleChangePendingEditorReply: React.PropTypes.func,
    handleChangeCardEditStatus: React.PropTypes.func
  },

  declineBtnText: function() {
    if (this.props.cardEdit.status === 'declining') {
      return 'declining changes...'
    } else {
      return 'decline changes'
    }
  },

  render: function() {
    var cardEdit = this.props.cardEdit;

    return(
      <div>
        <div><small>Reason for declining changes:</small></div>
        <TextArea
          text={cardEdit.pendingEditorReply}
          defaultText="I'm declining these changes because..."
          onChange={this.props.handleChangePendingEditorReply}
        />

        <XsBtn
          text={this.declineBtnText()}
          // change the cardEdit status to declining
          callbackAttribute='declining'
          callbackAttributeId={cardEdit.id}
          onClick={this.props.handleChangeCardEditStatus}
          primary
        />
        <XsBtn
          text='cancel'
          // if the cardEdit has been set to declining, hide the cancel button
          hidden={(cardEdit.status === 'declining') ? true : false}
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