var SubmittedBy = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    style: React.PropTypes.object,
    name: React.PropTypes.string
  },

  allArgumentsGiven: function() {
    var idPresent = _.toNumber(this.props.id) > 0
    var userNamePresent = (_.toString(this.props.name)).length > 0

    return (idPresent && userNamePresent) ? true : false
  },

  render: function() {
    var url = "/users/" + this.props.id;

    if ( _.isObject(this.props.style) ) {
      var style = this.props.style;
    } else {
      var style = {
        color: '#7b8996'
      };
    }

    if (this.allArgumentsGiven()) {
      return (
        <small style={style}>
          Submitted by 
          <a href={url} style={style}>
            {" " + _.toString(this.props.name)}
          </a>
          <br/>
        </small>
      )
    } else {
      return null
    }
  }
});