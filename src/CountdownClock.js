import React from 'react';

/* A class implementing a countdown clock with 2 buttons: a start\pause button,
   and a reset button.
*/
class CountdownClock extends React.Component {
  /* The render function for this class.
    The "element's structure":
    --- A title displaying the timer - minutes: seconds
    --- A start \ pause button ...  A reset button
  */
  render() {
    const minutes = this.props.minutesToDisplay
    const seconds = this.props.secondsToDisplay
    return (
      <div>
        <h1> Time Remaining is { minutes }:{ seconds < 10 ? `0${ seconds }`: seconds} </h1>
        <div>
          <button onClick={this.props.onPauseStartClick}>Start \ Pause</button>
          <button onClick={this.props.onResetClick}>Reset</button>
        </div>
      </div>
    );
  }
}
export default CountdownClock;
