import './App.css';
import React from 'react';
// import { render } from 'react-dom';

// A class representing a countdown clock.
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

  //
  componentDidUpdate() {
    
  }

  // This method is invoked once, and sets a timer.
  // https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
  componentDidMount() {
    this.myInterval = setInterval( () => {
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
            this.resetTimer()
            this.props.applyWhenDone();
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
    this.setState({
      minutes: this.initialMinutesCounter,
      seconds: this.initialSecondsCounter,
      isPaused: true
    })
  }

  // todo
  render() {
    // getting data from the state
    const { minutes, seconds } = this.state
    // displaying the data (notice the usage of string literals).
    return (
      <div>
        { minutes === 0 && seconds === 0 ?
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
class PomodoroTimer extends React.Component {

  // Pomodoro set : 25:00
  // break set: 5:00

  //
  constructor(props) {
    super(props)
    this.state = {
      // Setting initial times
      minutesForTimer: 0,
      secondsForTimer: 4,
      isOnBreak: false,
      pomodoroSetsCounter: 0
    }

    // bindind the "this"-term in "applyWhenTimerIsDone" to this (PomodoroTimer)
    this.applyWhenTimerIsDone = this.applyWhenTimerIsDone.bind(this)
  }

  //
  applyWhenTimerIsDone() {
    this.setState(() => ({
      isOnBreak: !this.state.isOnBreak,
      minutesForTimer: this.state.isOnBreak ? 0 : 0,
      secondsForTimer: this.state.isOnBreak ? 2: 3,
      pomodoroSetsCounter: this.state.pomodoroSetsCounter + 1,
    }))
  }

  // todo
  render() {
    return (
      <div>
        <h1> pomodoro set counter: {this.state.pomodoroSetsCounter} </h1>
        <h3> Welcome to PomodoroTimer </h3>
        <h4>
        <CountdownClock
          minutes={this.state.minutesForTimer}
          seconds={this.state.secondsForTimer}
          applyWhenDone={()=>{this.applyWhenTimerIsDone()}}
          />
        </h4>
      </div>
    )
  }
}

export default PomodoroTimer;
