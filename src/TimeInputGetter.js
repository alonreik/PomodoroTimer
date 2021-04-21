import React from 'react';

class TimeInputGetter extends React.Component {


  render() {
    return (
      <div>
        <label> {this.props.labelTitle} </label>
          <input type='number' min='0' max='59' placeholder='0' onChange={this.props.onMinutesChange}/>:
          <input type='number' min='0' max='59' placeholder='0' onChange={this.props.onSecondsChange}/>
      </div>
    );
  }
}

export default TimeInputGetter;
