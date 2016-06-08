DeckEditTab = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    text: React.PropTypes.string,
    handleDeckEditButtonClick: React.PropTypes.func
  },

  btnStatus: function() {
    if (this.props.active) {
      return('active')
    } else {
      return('')
    }
  },

  render: function() {
    var that = this;
    var style = {
      marginRight: '10px'
    };
    var linkStyle = {
      color: (this.props.active ? "#1abc9c" : "")
    };

    var cardCountText = "";
    if (this.props.cardSuggestionsCount > 0) {
      cardCountText = " (" + this.props.cardSuggestionsCount + ")";
    };

    var handleDeckEditButtonClick = function() {
      that.props.handleDeckEditButtonClick(that.props.text);
    };
    return(
      <li
        onClick={handleDeckEditButtonClick}
        className={this.btnStatus()}
        style={style}>
        <a style={linkStyle}>{this.props.text + cardCountText}</a>
      </li>
    )
  }
});