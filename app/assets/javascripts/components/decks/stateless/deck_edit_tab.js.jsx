DeckEditTab = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    text: React.PropTypes.string,
    handleSwitchTab: React.PropTypes.func
  },

  btnStatus: function() {
    if (this.props.active) {
      return('active')
    } else {
      return('')
    }
  },

  anyCardSuggestions: function() {
    return this.props.cardSuggestionsCount > 0
  },

  cardCountText: function() {
    if (this.anyCardSuggestions()) {
      return(" (" + this.props.cardSuggestionsCount + ")")
    } else {
      return ''
    }
  },

  render: function() {
    var that = this;
    var style = {
      marginRight: '10px'
    };
    var linkStyle = {
      color: (this.props.active ? '#34495e' : '')
    };
    var handleSwitchTab = function() {
      that.props.handleSwitchTab(that.props.text);
    };

    return(
      <li
        onClick={handleSwitchTab}
        className={this.btnStatus()}
        style={style}>
        <a style={linkStyle}>{this.props.text + this.cardCountText()}</a>
      </li>
    )
  }
});