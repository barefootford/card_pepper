var CardEditBy = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    name: React.PropTypes.string
  },

  style: {
    color: '#7b8996'
  },

  allArgumentsGiven: function() {
    var idPresent = _.toNumber(this.props.id) > 0;
    var namePresent = (_.toString(this.props.name)).length > 0;

    return (idPresent && namePresent) ? true : false
  },
  render: function() {
    if (this.allArgumentsGiven()) {
      var url = "/users/" + this.props.id;

      return (
        <small style={this.style}>
          Card Edit by 
          <a href={url} style={this.style}>
            {" " + _.toString(this.props.name) + " "}
          </a>
          <br/>
        </small>
      )
    } else {
      return null
    }
  }
});