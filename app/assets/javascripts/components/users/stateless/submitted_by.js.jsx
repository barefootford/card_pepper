var SubmittedBy = React.createClass({
  propTypes: {
    // id is user_id
    id: React.PropTypes.number,
    style: React.PropTypes.object,
    // name is user name
    name: React.PropTypes.string,
    alignRight: React.PropTypes.bool
  },

  allArgumentsGiven: function() {
    var idPresent = _.toNumber(this.props.id) > 0
    var userNamePresent = (_.toString(this.props.name)).length > 0

    return (idPresent && userNamePresent) ? true : false
  },

  style: function() {
    var baseStyle = {color: '#7b8996'}

    if ( _.isObject(this.props.style) ) {
      return _.merge(baseStyle, this.props.style);
    } else {
      return baseStyle;
    }
  },

  render: function() {
    var url = "/users/" + this.props.id;

    if (this.allArgumentsGiven()) {
      return (
        <small style={this.style()}>
          Submitted by 
          <a href={url} style={this.style()}>
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