import React, { Component } from 'react';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  render() {
    return <div>User Home</div>;
  }
}

export default UserHome;
