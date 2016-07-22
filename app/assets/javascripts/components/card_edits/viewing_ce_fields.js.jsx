Decks.Edit.ViewingCEFields = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired
  },

  render: function() {
    return(
      <div className='row'>
        <div className='col-md-8'>
          <XsBtn
            text='approve changes'
            onClick={this.props.handleChangeCardEditStatus}
            callbackAttribute='consideringApproving'
            callbackAttributeId={this.props.cardEdit.id}
          />

          <XsBtn
            text='decline changes'
            onClick={this.props.handleChangeCardEditStatus}
            callbackAttribute='consideringDeclining'
            callbackAttributeId={this.props.cardEdit.id}
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
    )
  }
})
