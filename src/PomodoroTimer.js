import './App.css';
import React from 'react';
import CountdownClock from './CountdownClock.js'
import TimeInputGetter from './TimeInputGetter.js'

/* Constants */
const requestPomodoroInputText = 'Please Specify the Duration [Minutes: Seconds] for Every Pomodoro:'
const requestBreakInputText = 'Please Specify the Duration [Minutes: Seconds] for Every Break:'

/* A class implementing a pomodoro timer with customized times for work (pomodoro)
  and breaks.
*/
class PomodoroTimer extends React.Component {

  constructor() {
    super()
    this.pomodoroMinutes = 0
    this.pomodoroSeconds = 0
    this.breakMinutes = 0
    this.breakSeconds = 0

    // Initialize state
    this.state = {
      // When isInitialSetup is true, the user is able to select custom times
      // for the timers. Otherwise, the 'input getters' are hidden.
      isInitialSetup:true,
      isPomodoro: true,
      currentMinutes: 0,
      currentSeconds: 0,
    }
    // preform setups that will be preformed every
    this.resetPomodoroCycle()

    // bind methods to this (PomodoroTimer) instance
    this.tick = this.tick.bind(this)
    this.onMinutesChange = this.onMinutesChange.bind(this)
    this.onSecondsChange = this.onSecondsChange.bind(this)
    this.startOrPauseTimer = this.startOrPauseTimer.bind(this)
    this.resetPomodoroCycle = this.resetPomodoroCycle.bind(this)
  }

  // Invoked every time the start\pause button is pressed.
  startOrPauseTimer() {
    if (this.state.isInitialSetup) {
      this.setState({
        isInitialSetup: false,
      })
    }

    if (this.isRunning) {
      clearInterval(this.myTimer)
    } else {
      this.myTimer = setInterval(this.tick, 1000)
    }
    this.isRunning = !this.isRunning
  }

  // Invoked during construction of an instance and every time the reset button
  // is pressed.
  resetPomodoroCycle() {
    // if the reset button was pressed (rather than the app just started)
    if (!this.state.isInitialSetup){
      clearInterval(this.myTimer)
    }

    this.myTimer = null
    this.isRunning = false
    this.pomodoroCounter = 1

    this.setState({
      pomodoroSessionDidEnd: false,
      isInitialSetup: true,
      currentMinutes: 0,
      currentSeconds: 0,
      isPomodoro: true
    })
  }

  // Invoked every time the current timer gets to 0:00.
  countDownDidEnd() {
    // if the last 'break Counter' just ended:
    if (this.pomodoroCounter > 4 && !this.state.isPomodoro){
      // flag that the session has ended and clear timer:
      this.setState({
        pomodoroSessionDidEnd: true,
      })
      clearInterval(this.myTimer)
      return
    }
    // if just finished counting a pomodoro
    if (this.state.isPomodoro) {
      this.pomodoroCounter = this.pomodoroCounter + 1
      this.setState({
        currentMinutes: this.breakMinutes,
        currentSeconds: this.breakSeconds,
      })
    } // if just finished counting a break
    else {
      this.setState({
        currentMinutes: this.pomodoroMinutes,
        currentSeconds: this.pomodoroSeconds,
      })
    }
    // toggle the isPomodoro boolean
    this.setState({
      isPomodoro: !this.state.isPomodoro,
    })
  }

  // Takes 1 second off the current timer: [currentMinutes: currentSeconds]
  tick() {
    const minutes = this.state.currentMinutes
    const seconds = this.state.currentSeconds

    if (seconds > 0) {
      this.setState({
        currentSeconds: seconds - 1
      })
    } else if (seconds === 0) {
        if (minutes === 0) { // if time is up
          this.countDownDidEnd()
        } else { // minutes > 0
          this.setState({
            currentMinutes: minutes - 1,
            currentSeconds: 59
          })
        }
    }
  }

  // Invoked every time users change the value of input fields for minutes.
  onMinutesChange(event) {
    // The input getter for pomodoro timers has id == 1
    if (event.target.id === '1') {
      this.pomodoroMinutes = event.target.value
      this.setState({
        currentMinutes: this.pomodoroMinutes,
      })
    } else { // The input getter for break timers has id == 2
      this.breakMinutes = event.target.value
    }
  }

  // Invoked every time users change the value of input fields for seconds.
  onSecondsChange(event) {
    // The input getter for pomodoro timers has id == 1
    if (event.target.id === '1') {
      this.pomodoroSeconds = event.target.value
      this.setState({
        currentSeconds: event.target.value
      })
    } else { // The input getter for break timers has id == 2
      this.breakSeconds = event.target.value
    }
  }

  /*
  The render function for this class.
  The "element's structure":
  --- General title

  --- input getters for setting up the clocks

  --- optinoal title displaying the timer's state (whether on pomodoro or break)
    --- The title disappears when the current pomodoro session is done.

  --- CountDownClock element displaying current time count.

  --- Optional title. Lets the user know when the timer is finished and
        need to be reset.
  */
  render() {
    return (
      <div className='Centered'>
        <h1> Pomodoro Timer </h1>

        <div>
          {this.state.isInitialSetup && <TimeInputGetter
                                          id={1}
                                          minutesDidSet={this.onMinutesChange}
                                          secondsDidSet={this.onSecondsChange}
                                          labelTitle={requestPomodoroInputText}
                                          />}

          {this.state.isInitialSetup && <TimeInputGetter
                                          id={2}
                                          minutesDidSet={this.onMinutesChange}
                                          secondsDidSet={this.onSecondsChange}
                                          labelTitle={requestBreakInputText}
                                          />}
        </div>

        <div>
        {!this.state.isInitialSetup && !this.state.pomodoroSessionDidEnd &&
          <h1>
          Currently Counting Down for {this.state.isPomodoro? " Pomodoro # " + (this.pomodoroCounter) : " Break"}
          </h1>}
        </div>

        <div>
          <CountdownClock
            minutesToDisplay={this.state.currentMinutes}
            secondsToDisplay={this.state.currentSeconds}
            onPauseStartClick={this.startOrPauseTimer}
            onResetClick={this.resetPomodoroCycle}
            />
        </div>

        {this.state.pomodoroSessionDidEnd && <h4> Pomodoro Session is Over <br/> Press Restart to Set Another Timer </h4>}
      </div>

    )
  }
}
export default PomodoroTimer;
