var CardSuggestionAlert = React.createClass({
  render: function() {
    if (this.props.message.length > 0) {
      var style = {
        backgroundColor: '#f0faf8'
      };

      return(
        <div style={style} className="alert">
          <button
            onClick={this.props.onClick}
            className="close fui-cross">
          </button>
          <h4>Success</h4>
          <p>{this.props.message}</p>
        </div>
      )
    } else {
      return null
    }
  }
})

