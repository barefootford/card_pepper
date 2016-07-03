var CardEditDiff = React.createClass({
  propTypes: {
    before: React.PropTypes.string.isRequired,
    after: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
  },

  divStyle: {
    marginRight: '10px',
    marginBottom: '10px'
  },

  insertStyle: {
    backgroundColor: 'rgb(217,255,225)',
    color: 'black'
  },

  removeStyle: {
    backgroundColor: 'rgb(255,226,227)',
    color: 'black'
  },

  labelStyle: {
    marginBottom: '-5px',
    color: '#7f8c9a'
  },

  render: function() {
    if (this.props.active) {
      return(
        <div style={this.divStyle}>
          <label style={this.labelStyle}>{this.props.label}:</label>
          <div style={this.removeStyle}>{this.props.before}</div>
          <div style={this.insertStyle}>{this.props.after}</div>
        </div>
      )
    } else {
      return null
    }
  }
});