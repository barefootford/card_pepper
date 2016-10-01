Decks.ContributorsTab = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    deckId: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      ajaxStatus: '',
      contributors: []
      // {
      //   name: 'Andrew',
      //   url: '/users/1',
      //   contributions: {
      //     edited: 0,
      //     created: 5
      //   }
      // }
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
    var contributors = this.state.contributors
    if (!contributors) {
      return <div>No contributors yet.</div>
    }
    if ((ajaxStatus === 'requesting') || (ajaxStatus === '')) {
      return <QuietLabel text="loading..." />
    }
    if (ajaxStatus === 'received' && anyContributors ) {
      return <div>some contributors</div>
    }
    if (ajaxStatus === 'responseReceived') {
      return (
        _.map(contributors, function(user){
          return (
            <div key={user.url}>
              <A
                text={user.name}
                href={user.url}
              />
            <span> - {this.contributionText(user.created, user.edited)}</span>
            </div>
          )
        }.bind(this))
      )
    }
  },

  contributionText: function (created, edited) {
    var summation = ''
    edited = edited || ''
    created = created || ''
    if (created) {
      if (created === 1) {
        created = '1 New Card'
      } else {
        created += ' New Cards'
      }
    }
    summation += created;
    if (edited) {
      if (edited === 1) {
        edited = '1 Card Edit'
      } else {
        edited += ' Card Edits'
      }
    }
    if (edited) {
      summation += ', ' + edited
    }
    return summation
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
