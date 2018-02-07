import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../config';

class IntervalSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resetInterval = this.resetInterval.bind(this);
  }

  componentWillMount() {
    this.resetInterval();
  }

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.intervalStart}
            onChange={event =>
              this.setState({ intervalStart: event.target.value })
            }
          />
          <input
            value={this.state.intervalEnd}
            onChange={event =>
              this.setState({ intervalEnd: event.target.value })
            }
          />
        </div>
        <button onClick={this.resetInterval}>Reset to past 24 hours</button>
        <button onClick={this.handleGetTimeSegments}>View activity</button>
      </div>
    );
  }

  handleGetTimeSegments() {
    this.props.getTimeSegments();
  }

  resetInterval() {
    let d = new Date();
    this.setState({
      intervalStart: d.getTime() - 8640000,
      intervalEnd: d.getTime()
    });
  }
}

export default IntervalSelect;
