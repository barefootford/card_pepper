var CardSuggestionSubmittedBy = React.createClass({
  render: function() {
    var url = "/users/" + this.props.id;

    return(
      <small>
        Submitted by 
        <a href={url}>
          {" " + this.props.name}
        </a>
        <br/>
      </small>
    )
  }
});