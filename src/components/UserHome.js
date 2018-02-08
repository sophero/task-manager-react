import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../config';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';
import CurrentActivity from './CurrentActivity';
import SelectInterval from './SelectInterval';
import ListTimeSegments from './ListTimeSegments';
import Timer from './Timer';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      curIntervalStart: '',
      curIntervalStop: '',
      currentActivity: null,
      currentView: 'viewInterval',
      timeSegments: []
    };
    this.createActivity = this.createActivity.bind(this);
    this.readActivities = this.readActivities.bind(this);
    this.selectActivity = this.selectActivity.bind(this);
    this.setCurInterval = this.setCurInterval.bind(this);
    this.getTimeSegments = this.getTimeSegments.bind(this);
    this.readActivities();
  }

  render() {
    console.log('UserHome state:', this.state);
    let activityForm, selectInterval, listTimeSegments; // child components
    let homeBtn, newActivityBtn, selectIntervalBtn; // buttons to switch between views
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
      selectIntervalBtn = (
        <button onClick={() => this.setState({ currentView: 'viewInterval' })}>
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

    if (this.state.currentView === 'viewInterval') {
      selectInterval = (
        <SelectInterval
          getTimeSegments={this.getTimeSegments}
          setCurInterval={this.setCurInterval}
          timeSegments={this.state.timeSegments}
        />
      );
    }

    if (this.state.currentView === 'viewInterval') {
      listTimeSegments = (
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
        <ActivityList
          activityList={this.state.activityList}
          currentActivity={this.state.currentActivity}
          selectActivity={this.selectActivity}
        />
        {activityForm}
        {selectInterval}
        {listTimeSegments}
        {homeBtn}
        {selectIntervalBtn}
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

  setCurInterval(curIntervalStart, curIntervalStop) {
    this.setState({ curIntervalStart, curIntervalStop });
  }

  getTimeSegments(start, stop) {
    if (!start || !stop) {
      start = this.state.curIntervalStart;
      stop = this.state.curIntervalStop;
    }
    axios({
      method: 'get',
      url: `${url}/time_segments/${start}/${stop}`,
      headers: { 'x-auth': this.props.token }
    })
      .then(res => {
        this.setCurInterval(start, stop);
        this.setState({
          timeSegments: res.data.timeSegments
        });
      })
      .catch(e => console.log(e));
  }
}

export default UserHome;
