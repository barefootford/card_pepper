var SubmittedBy = React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    style: React.PropTypes.object,
    name: React.PropTypes.string
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

    return(
      <small style={style}>
        Submitted by 
        <a href={url} style={style}>
          {" " + this.props.name}
        </a>
        <br/>
      </small>
    )
  }
});