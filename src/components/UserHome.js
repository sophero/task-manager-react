import React, { Component } from 'react';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      token: props.token
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.signOut(this.state.token)}>
          Sign Out
        </button>
        <h1>Welcome, {this.state.user.name}!</h1>
      </div>
    );
  }
}

export default UserHome;
