DeckEditButton = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    text: React.PropTypes.string,
    handleDeckEditButtonClick: React.PropTypes.func
  },

  style: {
    marginRight: '10px'
  },

  btnStatus: function() {
    if (this.props.active) {
      return('btn-inverse')
    } else {
      return('btn-default')
    }
  },

  render: function() {
    var that = this;

    cardCountText = "";
    if (this.props.cardSuggestionsCount > 0) {
      var cardCountText = " (" + this.props.cardSuggestionsCount + ")";
    }

    var handleDeckEditButtonClick = function() {
      that.props.handleDeckEditButtonClick(that.props.text)
    };
    return(
      <button onClick={handleDeckEditButtonClick}
       className={"btn btn-sm " + this.btnStatus()} style={this.style}>
        {this.props.text + cardCountText}
      </button>
    )
  }
})