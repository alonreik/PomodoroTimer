import './App.css';
import React from 'react';
import { render } from 'react-dom';

// todo
class Timer extends React.Component {

  // constants


  // todo
  constructor(props) {
    // todo - am i using props?
    super(props)
    this.state = {
      minutes: 0,
      seconds: 2
    }

    // just declaring here
    this.myInterval = null
  }

  // This method will be invoked every time
  // https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7
  componentDidMount() {
    //

    this.myInterval = setInterval( () => {
      const { seconds, minutes } = this.state
      if (seconds > 0) {
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

  // todo
  render() {
    // getting data from the state
    const { minutes, seconds } = this.state
    // displaying the data (notice the usage of string literals).
    return (
      <div>
        {minutes === 0 && seconds === 0 ?
        <h1> Time is up </h1>:

        // insert below what is the set and what is the round
        <h1> Time Remaining for X is { minutes }:{ seconds < 10 ? `0${ seconds }`: seconds} </h1>
        }
      </div>
    )
  }
}

export default Timer;
