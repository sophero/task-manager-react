import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../config';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';
import CurrentActivity from './CurrentActivity';
// import IntervalSelect from './IntervalSelect';
import ListTimeSegments from './ListTimeSegments';
import Timer from './Timer';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      currentActivity: null,
      currentInterval: { start: '', stop: '' },
      currentView: 'home',
      selectInterval: { start: '', stop: '' },
      timeSegments: []
    };
    this.readActivities();
    this.createActivity = this.createActivity.bind(this);
    this.readActivities = this.readActivities.bind(this);
    this.selectActivity = this.selectActivity.bind(this);
    this.resetSelectInterval = this.resetSelectInterval.bind(this);
    this.getTimeSegments = this.getTimeSegments.bind(this);
  }

  render() {
    console.log('UserHome state:', this.state);
    let activityForm, intervalSelect; // child components
    let homeBtn, newActivityBtn, intervalSelectBtn; // buttons to switch between views
    if (this.state.currentView !== 'home') {
      homeBtn = (
        <button onClick={() => this.setState({ currentView: 'home' })}>
          Back
        </button>
      );
    } else {
      // buttons available on home view
      newActivityBtn = (
        <button onClick={() => this.setState({ currentView: 'newActivity' })}>
          Add new activity
        </button>
      );
      intervalSelectBtn = (
        <button
          onClick={() => this.setState({ currentView: 'intervalSelect' })}
        >
          View by Day/Week/Month
        </button>
      );
    }

    if (this.state.currentView === 'newActivity') {
      activityForm = (
        <ActivityForm
          form="create"
          createActivity={this.createActivity}
          user={this.props.user}
          setErrorMsg={this.props.setErrorMsg}
        />
      );
    }

    if (this.state.currentView === 'intervalSelect') {
      intervalSelect = (
        // <IntervalSelect
        //   token={this.props.token}
        //   getTimeSegments={this.getTimeSegments}
        //   timeSegments={this.state.timeSegments}
        // />
        <div>
          <div>
            <input
              value={this.state.selectInterval.start}
              onChange={event =>
                this.setState({ 'selectInterval.start': event.target.value })
              }
            />
            <input
              value={this.state.selectInterval.stop}
              onChange={event =>
                this.setState({ 'selectInterval.stop': event.target.value })
              }
            />
          </div>
          <button onClick={this.resetSelectInterval}>
            Reset to past 24 hours
          </button>
          <button onClick={this.getTimeSegments}>View activity</button>
        </div>
      );
    }

    let ListTimeSegments;
    if (this.state.timeSegments.length > 0) {
      ListTimeSegments = (
        <ListTimeSegments timeSegments={this.state.timeSegments} />
      );
    }

    return (
      <div>
        <button onClick={() => this.props.signOut(this.props.token)}>
          Sign Out
        </button>
        <h1>Welcome, {this.props.user.name}!</h1>
        <CurrentActivity
          activity={this.state.currentActivity}
          token={this.props.token}
          readActivities={this.readActivities}
          setErrorMsg={this.props.setErrorMsg}
          getTimeSegments={this.getTimeSegments}
        />
        <Timer
          token={this.props.token}
          activity={this.state.currentActivity}
          readActivities={this.readActivities}
          getTimeSegments={this.getTimeSegments}
        />
        {/* {timer} */}
        <ActivityList
          activityList={this.state.activityList}
          currentActivity={this.state.currentActivity}
          selectActivity={this.selectActivity}
        />

        {activityForm}
        {intervalSelect}
        {ListTimeSegments}
        {homeBtn}
        {intervalSelectBtn}
        {newActivityBtn}
      </div>
    );
  }

  createActivity(activity) {
    axios({
      method: 'post',
      url: `${url}/activities`,
      headers: { 'x-auth': this.props.token },
      data: activity
    })
      .then(() => {
        this.readActivities();
      })
      .catch(e => console.log(e));
  }

  readActivities() {
    axios({
      method: 'get',
      url: `${url}/activities`,
      headers: { 'x-auth': this.props.token }
    })
      .then(res => this.setState({ activityList: res.data.activities }))
      .catch(e => console.log(e));
  }

  selectActivity(_activity_id) {
    axios({
      method: 'get',
      url: `${url}/activities/${_activity_id}`,
      headers: { 'x-auth': this.props.token }
    })
      .then(res => this.setState({ currentActivity: res.data.activity }))
      .catch(e => console.log(e));
  }

  resetSelectInterval() {
    let d = new Date();
    // this.setState({
    //   'selectInterval.start': d.getTime() - 8640000,
    //   'selectInterval.stop': d.getTime()
    // });
    this.setState({
      selectInterval: {
        ...this.state.selectInterval,
        start: d.getTime() - 8640000,
        stop: d.getTime()
      }
    });
  }

  getTimeSegments() {
    let { start, stop } = this.state.selectInterval;
    axios({
      method: 'get',
      url: `${url}/time_segments/${start}/${stop}`,
      headers: { 'x-auth': this.props.token }
    })
      .then(res => {
        this.setState({ timeSegments: res.data.timeSegments });
      })
      .catch(e => console.log(e));
  }
}

export default UserHome;
