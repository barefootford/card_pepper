var CardSuggestions = React.createClass({
  render: function() {
    if (this.props.active) {
      return (<div> Some suggested cards </div>)
    } else {
      return null
    }
  }
})