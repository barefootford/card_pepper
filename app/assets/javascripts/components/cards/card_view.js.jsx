var CardView = React.createClass({
  getInitialState: function() {
    return({
      showingAnswer: false,
    })
  },
  getCardAnswer: function() {
    if (this.state.showingAnswer) {
      return(<p>{this.props.card.answer}</p>)
    } else {
      return(<p>--------------------</p>) 
    }
  },
  getButtons: function() {
    if (this.state.showingAnswer) {
      return(this.responseButtons())
    } else {
      return(this.answerButton())   
    }
  },
  answerButton: function() {
    return (
      <div>
        <button className='btn btn-default btn-lg'
         onClick={this.showAnswer} id='show-btn'>
          Show Answer
        </button>
      </div>
    )
  },
  responseButtons: function() {
    var buttonStyle = {marginRight: '10'};
    return (
      <div>
        <button style={buttonStyle}
          className='btn btn-primary btn-lg'
          onClick={this.handleCorrectResponse}>
          Got it
        </button>
        <button className='btn btn-default btn-lg'
          onClick={this.handleIncorrectResponse}
        >
          Again
        </button>
      </div>
    )
  },
  handleCorrectResponse: function(e) {
    e.preventDefault();
    this.props.handleResponses('got-it');
  },
  handleIncorrectResponse: function(e) {
    e.preventDefault();
    this.props.handleResponses('again');
  },
  showAnswer: function() {
    this.setState({showingAnswer: true})
  },
  render: function() {
    return (
      <div id={this.props.card.id}>
        <br></br>
        <p id='card-question'>
          {this.props.card.question}
        </p>
        <hr></hr>
        <p>
          {this.getCardAnswer()}
        </p>
        <p>
          {this.getButtons()}
        </p>
      </div>
    )
  }
});