var Welcome = React.createClass({
  propTypes: {
    userSawWelcomeMessage: React.PropTypes.bool.isRequired,
    handleUserSawWelcomeMessage: React.PropTypes.func.isRequired
  },

  render: function() {
    if (this.props.userSawWelcomeMessage) {
      return null
    } else {
      var style={
        backgroundColor: '#edeff1',
        padding: '14px'
      };

      return(
        <div style={style}>
          <h5>Welcome to Card Pepper</h5>
          <p>
            First, thanks a million for joining the Card Pepper beta. If you happen to find a 
            bug while working on the website, I would be extremely appreciative 
            if you <a href='/reportabug'>made a bug report</a> so I can quicly fix the issue.
            There is a pretty good chance you're going to find something. :-/
          </p>
          <p>
            I have a long list of features that I'd like to build, but I'm even 
            more interested in what you'd like to use. If you think up something or
            see something missing, please <a href='/requestafeature'>create a feature request</a>.
          </p>
          <p>
            Finally, if you'd rather email or tweet directly, you can email me at Ford.andrewid@gmail.com or find me on Twitter at <a href='https://twitter.com/maybeandrewford'>@maybeandrewford</a>.
          </p>
          <p>
          Thanks, <br/>
            <em>af</em>
          </p>
          <br/>
          <XsBtn
            text='close'
            onClick={this.props.handleUserSawWelcomeMessage}
          />
        </div>
      )
    }
  }
});