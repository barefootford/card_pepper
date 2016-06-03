var SubmittedBy = React.createClass({
  render: function() {
    var url = "/users/" + this.props.id;
    var style = {
      color: '#7b8996',
      textAlign: 'right'
    };

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