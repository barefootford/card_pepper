Decks.Show.Contributors = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    deckId: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      ajaxStatus: '',
      contributors: [],
      // {
      //   name: 'Andrew',
      //   url: '/users/1',
      //   contributionText: '9 New Cards, 3 Card Edits'
      //  }
      // ]
    }
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.active && this.state.ajaxStatus === '') {
      this.setState({ajaxStatus: 'requesting'});

      if (this.state.ajaxStatus === '') {
        $.ajax({
          url: '/deck_contributors/' + this.props.deckId,
          success: function(response) {
            this.setState({contributors: response, ajaxStatus:'responseReceived'})
          }.bind(this),
          errors: function(response) {
            console.log(response)
            this.setState({ajaxStatus: 'error'})
          }.bind(this)
        })
      }
    }
  },

  displayContributors: function() {
    var ajaxStatus = this.state.ajaxStatus;
    var anyContributors = this.state.contributors.length > 0;

    if ((ajaxStatus === 'requesting') || (ajaxStatus === '')) {
      return <QuietLabel text="loading..." />
    } else if (ajaxStatus === 'received' && anyContributors ) {
      return <div>some contributors</div>
    } else if (ajaxStatus === 'responseReceived' && anyContributors) {
      return (
        _.map(this.state.contributors, function(contributor){
          return (
            <div key={contributor.url}>
              <A
                text={contributor.name}
                href={contributor.url}
              />
              <span> - {contributor.contributionText}</span>
            </div>
          )
        })
      )
    } else {
      return <div>No community contributors yet.</div>
    }
  },

  render: function() {
    var active = this.props.active;
    var ajaxStatus = this.state.ajaxStatus;

    if (active === false) {
      return null
    } else {
      return (
        <table className='table table-striped'>
          <tbody>
            <tr>
              <td>
                {
                  this.displayContributors()
                }
              </td>
            </tr>
          </tbody>
        </table>
      )
    } 
  }
});