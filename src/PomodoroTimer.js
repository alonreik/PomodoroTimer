import './App.css';
import React from 'react';
// import { render } from 'react-dom';
import CountdownClock from './CountdownClock.js'

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
