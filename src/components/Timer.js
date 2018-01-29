import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../config';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: 0,
      startTime: 0,
      // totalTime: 0,
      working: false
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.updateCurTime = this.updateCurTime.bind(this);
  }

  render() {
    let totalTime = this.millisecsToHourMinSecString(this.state.totalTime);
    let curTime = this.millisecsToHourMinSecString(this.state.curTime);
    console.log(this.props);

    return (
      <div>
        <button disabled={this.state.working} onClick={this.start}>
          Start
        </button>
        <button disabled={!this.state.working} onClick={this.stop}>
          Stop
        </button>
        <div>{curTime}</div>
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  millisecsToHourMinSecString(millisecs) {
    function addZeroNumToStr(num) {
      if (num < 10) {
        return String('0' + num);
      } else {
        return String(num);
      }
    }
    let secs = millisecs / 1000;
    let hours = Math.floor(secs / 3600);
    let mins = Math.floor(secs / 60) % 60;
    let remSecs = Math.floor(secs % 60);
    mins = addZeroNumToStr(mins);
    remSecs = addZeroNumToStr(remSecs);
    if (hours === 0) {
      return `${mins}:${remSecs}`;
    } else {
      return `${hours}:${mins}:${remSecs}`;
    }
  }

  updateCurTime() {
    this.timer = setTimeout(() => {
      let curTime = Date.now() - this.state.startTime;
      this.setState({ curTime }, this.updateCurTime);
    }, 1000);
  }

  start() {
    this.setState({ curTime: 0 });
    let startTime = new Date().getTime();
    this.setState({ startTime, working: true }, this.updateCurTime);
    axios({
      method: 'post',
      url: `${url}/time_segments`,
      headers: { 'x-auth': this.props.token },
      data: {
        startTime,
        _activity_id: this.props.activity._id
      }
    })
      .then(res => {
        this.setState({ timeSegmentId: res.data.time_segment._id });
      })
      .catch(e => console.log(e));
    // AJAX call to database, create new time segment with: startTime, activity name
  }

  stop() {
    clearTimeout(this.timer);
    let stopTime = new Date().getTime();
    let millisecDiff = stopTime - this.state.startTime;
    // insert AJAX call to write stopTime for the current time segment
    // let totalTime = this.state.totalTime + millisecDiff;
    this.setState({
      // totalTime,
      working: false
    });
    axios({
      method: 'patch',
      url: `${url}/time_segments/${this.state.timeSegmentId}`,
      headers: { 'x-auth': this.props.token },
      data: { stopTime }
    })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
}

export default Timer;
