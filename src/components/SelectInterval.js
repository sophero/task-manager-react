import React, { Component } from 'react';

class SelectInterval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalStart: '',
      intervalStop: ''
    };
    this.resetInterval = this.resetInterval.bind(this);
    this.handleGetTimeSegments = this.handleGetTimeSegments.bind(this);
    this.handleSetCurInterval = this.handleSetCurInterval.bind(this);
  }

  componentWillMount() {
    this.resetInterval();
  }

  componentDidMount() {
    this.handleSetCurInterval();
  }

  render() {
    console.log('SelectInterval state:', this.state);
    return (
      <div>
        <div>
          <input
            value={this.state.intervalStart}
            onChange={event =>
              this.setState({ intervalStart: Number(event.target.value) })
            }
          />
          <input
            value={this.state.intervalStop}
            onChange={event =>
              this.setState({ intervalStop: Number(event.target.value) })
            }
          />
        </div>
        <button onClick={this.resetInterval}>Reset to past 24 hours</button>
        <button onClick={this.handleSetCurInterval}>Apply</button>
        <button onClick={this.handleGetTimeSegments}>View activity</button>
      </div>
    );
  }

  handleSetCurInterval() {
    this.props.setCurInterval(
      this.state.intervalStart,
      this.state.intervalStop
    );
  }

  handleGetTimeSegments() {
    this.props.getTimeSegments(
      this.state.intervalStart,
      this.state.intervalStop
    );
  }

  resetInterval() {
    let d = new Date();
    let intervalStart = d.getTime() - 8640000;
    let intervalStop = d.getTime();
    this.setState({ intervalStart, intervalStop });
    this.props.setCurInterval(intervalStart, intervalStop);
  }
}

export default SelectInterval;
