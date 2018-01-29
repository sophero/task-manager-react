import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../config';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';
import CurrentActivity from './CurrentActivity';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      currentActivity: null,
      currentView: 'home'
    };
    this.readActivities();
    this.createActivity = this.createActivity.bind(this);
    this.readActivities = this.readActivities.bind(this);
    this.selectActivity = this.selectActivity.bind(this);
  }

  render() {
    console.log(this.state);
    let activityForm;
    let newActivityBtn;
    let homeBtn;
    if (this.state.currentView !== 'home') {
      homeBtn = (
        <button onClick={() => this.setState({ currentView: 'home' })}>
          Back
        </button>
      );
    } else {
      newActivityBtn = (
        <button onClick={() => this.setState({ currentView: 'newActivity' })}>
          Add new activity
        </button>
      );
    }
    if (this.state.currentView === 'newActivity') {
      activityForm = (
        <ActivityForm
          form="create"
          createActivity={this.createActivity}
          user={this.props.user}
        />
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
        />
        <ActivityList
          activityList={this.state.activityList}
          currentActivity={this.state.currentActivity}
          selectActivity={this.selectActivity}
        />
        {activityForm}
        {homeBtn}
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
}

export default UserHome;
