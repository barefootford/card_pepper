var ConsideringApprovingCEFields = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    approving: React.PropTypes.bool,
    handleChangePendingEditorReply: React.PropTypes.func.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired
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
        Let {cardEdit.name} know you're going to approve the changes:
        <TextArea
          text={cardEdit.editor_response}
          onChange={this.props.handleChangePendingEditorReply}
          callbackAttributeID={cardEdit.id}
        />

        <div className='row'>
          <div className='col-md-8'>
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
          <div style={{textAlign: 'right'}} className='col-md-4'>
            <SubmittedBy
              id={this.props.cardEdit.user_id}
              name={this.props.cardEdit.name}
            />
          </div>
        </div>
      </div>
    )
  }
})