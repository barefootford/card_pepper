var DeckTitle = React.createClass({
  editLink: function() {
    var deckEditorIsCurrentUser = this.props.deckEditor.id === this.props.currentUser.id;

    if (deckEditorIsCurrentUser && (this.props.currentPage === 'show')) {
      return(
        <span>
        | <a href={"/decks/" + this.props.deckID + "/edit"}> edit deck</a>
        </span>
      )
    } else if (deckEditorIsCurrentUser && this.props.currentPage === 'edit'){
      return (
        <span>
          | <a href={"/decks/" + this.props.deckID}>view deck</a>
        </span>
      )
    } else {
      return null
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
          by <a href={"/users/" + this.props.deckEditor.id}>{this.props.deckEditor.name}</a>
          {' | ' + cardCountString}
          {' | ' + contributionString }
          { this.editLink() }
        </small>
        <hr/>
      </div>
    )
  }
});
