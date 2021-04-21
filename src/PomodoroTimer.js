import './App.css';
import React from 'react';
// import { render } from 'react-dom';
import CountdownClock from './CountdownClock.js'
import TimeInputGetter from './TimeInputGetter.js'

//
class PomodoroTimer extends React.Component {

  //
  constructor(props) {
    super(props)

    this.state = {
      // Setting initial times
      minutesForTimer: 0,
      secondsForTimer: 0,
      isOnBreak: false,
      pomodoroSetsCounter: 1
    }

    // bindind the "this"-term in "applyWhenTimerIsDone" to this (PomodoroTimer)
    this.applyWhenTimerIsDone = this.applyWhenTimerIsDone.bind(this)
    this.getPomodoroMinutes = this.getPomodoroMinutes.bind(this)
    this.getPomodoroSeconds = this.getPomodoroSeconds.bind(this)

  }

  //
  applyWhenTimerIsDone() {
    this.setState(() => ({
      minutesForTimer: this.state.isOnBreak ? 25 : 3,
      secondsForTimer: this.state.isOnBreak ? 0 : 0,
      pomodoroSetsCounter: this.state.isOnBreak ? this.state.pomodoroSetsCounter :this.state.pomodoroSetsCounter + 1,
      isOnBreak: !this.state.isOnBreak,
    }))
  }

  getPomodoroMinutes = (event) => {
    this.setState({
      minutesForTimer: event.target.value,
    })
  }

  getPomodoroSeconds = (event) => {
    console.log('seconds')
    console.log(event.target.value)
  }

  getBreakMinutes = (event) => {
    console.log(event.target.value)
  }

  getBreakSeconds = (event) => {
    console.log('seconds')
    console.log(event.target.value)
  }


  // todo
  render() {
    return (
      <div>
        <div>
          <TimeInputGetter
            labelTitle = 'Please Specify the Duration [Minutes: Seconds] for Every Pomodoro:'
            onMinutesChange = {this.getPomodoroMinutes}
            onSecondsChange = {this.getPomodoroSeconds}
          />
        </div>

        <div>
          <TimeInputGetter
            labelTitle = 'Please Specify the Duration [Minutes: Seconds] for Every Break:'
            onMinutesChange = {this.getBreakMinutes}
            onSecondsChange = {this.getBreakSeconds}
          />
        </div>

        <div>
        {
          this.state.pomodoroSetsCounter ?
          <div>
            <h1>
              Currently Counting Down for
              {this.state.isOnBreak? " Break" : " Pomodoro # " + (this.state.pomodoroSetsCounter)}
            </h1>
            <CountdownClock
              minutes={this.state.minutesForTimer}
              seconds={this.state.secondsForTimer}
              applyWhenDone={()=>{this.applyWhenTimerIsDone()}}
              />
          </div> :
          <h1> Thank You for Using Our Pomodoro Timer. <br/>
           If You Wish to Enjoy it Again, Refresh The Page. </h1>
        }
        </div>
      </div>
    )
  }
}

export default PomodoroTimer;
