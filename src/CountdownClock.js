import React from 'react';

// A class representing a countdown clock.
class CountdownClock extends React.Component {

  // constants


  // todo
  constructor(props) {
    super(props)

    this.resetMinutesTo = this.props.minutes;
    this.resetSecondsTo = this.props.seconds;

    this.state = {
      minutes: this.resetMinutesTo, // arbitrary since soon didMount will be invoked
      seconds: this.resetSecondsTo, // arbitrary since soon didMount will be invoked
      isPaused: true
    }
  }

  componentWillUnmount() {
    clearInterval(this.myTimer)
  }


  // This method is invoked once, and sets a timer.
  // https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
  componentDidMount() {
    //
    this.resetMinutesTo = this.props.minutes
    this.resetSecondsTo = this.props.seconds

    // Defining a function to be called every second:
    this.myTimer = setInterval( () => {
      const { seconds, minutes } = this.state

      // comment about it
      if (this.state.isPaused) {
         return
      }

      if (seconds > 0) {
          this.setState(({seconds}) => ({
            seconds: seconds - 1
          }))
      } else if (seconds === 0) {
          if (minutes === 0) { // if time is up
            this.props.applyWhenDone();
            this.resetTimer();

          } else { // minutes > 0
            this.setState( ({minutes}) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
      }
    }, 1000)
  }

  //
  startOrPauseTimer(){
    this.state.isPaused ? this.setState({isPaused:false}) : this.setState({isPaused:true})
  }

  //
  resetTimer() {
    this.resetMinutesTo = this.props.minutes
    this.resetSecondsTo = this.props.seconds

    this.setState({
      minutes: this.resetMinutesTo,
      seconds: this.resetSecondsTo,
      isPaused: true
    })
  }

  update() {
    console.log("update")
    this.resetMinutesTo = this.props.minutes
    this.resetSecondsTo = this.props.seconds

    if (this.state.minutes !== this.resetMinutesTo && this.state.seconds !== this.resetSecondsTo) {
      console.log("got to if")
      this.setState({
        minutes: this.resetMinutesTo,
        seconds: this.resetSecondsTo,
      })
    }
  }

  // todo
  render() {
    let minutes, seconds;
    if (this.state.isPaused) {
      minutes = this.props.minutes;
      seconds = this.props.seconds;
    } else {
      minutes = this.state.minutes;
      seconds = this.state.seconds;
    }
    // displaying the data (notice the usage of string literals).
    return (
      <div>
        <h1> Time Remaining is { minutes }:{ seconds < 10 ? `0${ seconds }`: seconds} </h1>
        <div className='button-div'>
          <button onClick={()=>{this.startOrPauseTimer()}}>Start \ Pause</button>
          <button onClick={()=>{this.resetTimer()}}>Reset</button>
        </div>
      </div>
    )
  }
}

export default CountdownClock;
