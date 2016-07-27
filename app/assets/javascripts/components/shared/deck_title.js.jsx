var DeckTitle = React.createClass({
  editLink: function() {
    var data = this.props.data;
    var deckEditorIsCurrentUser = data.deckEditor.id === data.currentUser.id;

    if (deckEditorIsCurrentUser && (data.currentPage === 'show')) {
      return(
        <span>
        | <a className='btn btn-xs btn-primary' href={"/decks/" + data.deckID + "/edit"}> edit deck</a>
        </span>
      )
    } else if (deckEditorIsCurrentUser && data.currentPage === 'edit'){
      return (
        <span>
          | <a className='btn btn-xs btn-primary' href={"/decks/" + data.deckID}>view deck</a>
        </span>
      )
    } else {
      return null
    }
  },
  render: function() {
    var data = this.props.data;
    var headStyle = {
      marginBottom: '-20px'
    };

    var cardCountString = ViewHelpers.pluralizeCard(data.cards.length);
    var contributionCount = ViewHelpers.communityContributionsCount(data.cards, data.deckEditor.id);
    var contributionString = ViewHelpers.pluralizeContrib(contributionCount);

    return (
      <div>
        <h3 style={headStyle}>{data.deckTitle}
        </h3>

        <small>
          by <a href={"/users/" + data.deckEditor.id}>{data.deckEditor.name}</a>
          {' | ' + cardCountString}
          {' | ' + contributionString }
          <Heart status='pending'/>
        </small>
        { this.editLink() }
        <div><QuietLabel text="You like this deck." /></div>
        <hr/>
      </div>
    )
  }
});
