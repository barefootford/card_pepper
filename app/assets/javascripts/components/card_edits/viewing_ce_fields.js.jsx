var ViewingCEFields = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    cardEdit: React.PropTypes.object.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired
  },

  render: function() {
    return(
      <div>
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
    )
  }
})
