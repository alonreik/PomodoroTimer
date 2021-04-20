import './App.css';
import React from 'react';
import { render } from 'react-dom';

// todo
class Timer extends React.Component {

  // todo
  constructor(props) {
    super()
    this.state = {
      minutes: 3,
      seconds: 2
    }
  }

  // todo
  componentDidMount() {
    this.myInterval = setInterval( () => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
          this.setState(({seconds}) => ({
            seconds: seconds - 1
          }))
      } else if (seconds == 0) {
          if (minutes == 0) {
            //todo
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
      <h1>Time Remaining for X is { minutes }:{ seconds < 10 ? `0${ seconds }`: seconds} </h1>
      // { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }
      </div>
    )
  }
}

export default Timer;
