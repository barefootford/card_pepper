var DeckTitle = React.createClass({
  editLink: function() {
    var editStyle = {
      // make it a 'silent' link
      color: '#34495e'
    };
    // move this into a component

    var deckEditorIsCurrentUser = this.props.deckEditor.id === this.props.currentUser.id;
    if ((this.props.currentPage !== 'edit') && deckEditorIsCurrentUser ) {
      return(
        <span>
        | <a href={"/decks/" + this.props.deckID + "/edit"} style={editStyle}> edit</a>
        </span>
      )
    } else {
      return (
        <span>
          | <a href={"/decks/" + this.props.deckID} style={editStyle}>view</a>
        </span>
      )
    }
  },
  render: function() {
    var headStyle = {
      marginBottom: '-4px'
    };

    var cardCountString = ViewHelpers.pluralizeCard(this.props.cards.length);
    var contributionCount = ViewHelpers.communityContributionsCount(this.props.cards, this.props.deckEditor.id);
    var contributionString = ViewHelpers.pluralizeContrib(contributionCount);

    return (
      <div>
        <h3 style={headStyle}>{this.props.deckTitle}</h3>
        <small>
          Editor: <a href={"/users/" + this.props.deckEditor.id}>{this.props.deckEditor.name}</a>
          {' | ' + cardCountString}
          {' | ' + contributionString }
          { this.editLink() }
        </small>
        <br/>
        <hr/>
      </div>
    )
  }
});
