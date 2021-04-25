import React from 'react';

// A class implementing 2 numeric input getters for numbers in 0-59.
class TimeInputGetter extends React.Component {

  /* The render function for this class.
    The "element's structure":
    --- A label introducing the input fields.
    --- An input field for a number in 0-59.
    --- An input field for a number in 0-59.
  */
  render() {
    return (
      <div>
        <label> {this.props.labelTitle} </label>
          <input id={this.props.id} type='number' min='0' max='59' placeholder='0' onChange={this.props.minutesDidSet}/> :
          <input id={this.props.id} type='number' min='0' max='59' placeholder='0' onChange={this.props.secondsDidSet}/>
      </div>
    );
  }
}

export default TimeInputGetter;
