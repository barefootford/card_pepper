var DeckTab = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    handleSwitchTab: React.PropTypes.func.isRequired,
    callbackAttribute: React.PropTypes.string.isRequired
  },

  btnStatus: function() {
    // ternary operator here
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
    var style = {
      marginRight: '10px'
    };
    var linkStyle = {
      color: (this.props.active ? '#34495e' : '')
    };

    return(
      <li
        className={this.btnStatus()}
        style={style}
      >
        <a
          onClick={this.props.handleSwitchTab}
          style={linkStyle}
          href={this.props.href}
          data-callback-attribute={this.props.callbackAttribute}
        >
          {this.props.text + this.cardCountText()}
        </a>
      </li>
    )
  }
});