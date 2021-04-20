import './App.css';
import React from 'react';
// import { render } from 'react-dom';

// todo
class CountdownClock extends React.Component {

  // constants


  // todo
  constructor(props) {
    super(props)
    this.initialMinutesCounter = props.minutes
    this.initialSecondsCounter = props.seconds
    this.myInterval = null

    this.state = {
      minutes: props.minutes,
      seconds: props.seconds,
      isPaused: true
    }
  }

  // This method will be invoked every time
  // https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
  componentDidMount() {

    this.myInterval = setInterval( () => {
      const { seconds, minutes } = this.state

      // comment about it
      if (this.state.isPaused) {
         return
      }

      if (seconds > 0 && !this.state.isPaused) {
          this.setState(({seconds}) => ({
            seconds: seconds - 1
          }))
      } else if (seconds === 0) {
          if (minutes === 0) { // if time is up
            clearInterval(this.myInterval)
          } else { // minutes > 0
            this.setState(({minutes}) => ({
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

  resetTimer() {
    this.setState({
      minutes: this.initialMinutesCounter,
      seconds: this.initialSecondsCounter,
      isPaused:true
    })
  }

  // todo
  render() {
    // getting data from the state
    const { minutes, seconds } = this.state
    // displaying the data (notice the usage of string literals).
    return (
      <div>
        {minutes === 0 && seconds === 0 ?
        <h1> Time is up </h1>:
        <h1> Time Remaining for X is { minutes }:{ seconds < 10 ? `0${ seconds }`: seconds} </h1>
        }
        <div className='button-div'>
        <button onClick={()=>{this.startOrPauseTimer()}}>Start \ Pause</button>
        <button onClick={()=>{this.resetTimer()}}>Reset</button>
        </div>
      </div>
    )
  }
}

//
class PomodotoTimer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // todo
  render() {
    return (
      <div>
      <h3> Welcome to PomodotoTimer </h3>

        <h4>
        <CountdownClock
        minutes={0}
        seconds={10}
        />
        </h4>
      </div>
    )
  }
}



export default PomodotoTimer;
