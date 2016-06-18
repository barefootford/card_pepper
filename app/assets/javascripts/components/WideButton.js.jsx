var WideSaveButton = React.createClass({
  propTypes: {
    onSaveClick: React.PropTypes.func.isRequired,
    standardText: React.PropTypes.string.isRequired,
    savingText: React.PropTypes.string,
    objectStatus: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      savingText: 'Saving...',
      objectStatus: 'editing'
    }
  },

  buttonText: function() {
    var status = this.props.objectStatus;
    if (status === 'saving') {
      return this.props.savingText
    }
    else {
      return this.props.standardText
    }
  },

  render: function() {
    var style = {
      marginTop: '10px'
    };

    return(
      <button
        style={style}
        onClick={this.props.onSaveClick}
        className='btn btn-block btn-primary'
      >
        {this.buttonText()}
      </button>
    )
  }
});