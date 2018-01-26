import React, { Component } from 'react';

import UserForm from './UserForm';
import UserHome from './UserHome';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      form: 'Sign Up'
    };
  }

  render() {
    if (this.state.user) {
      return <UserHome user={this.state.user} />;
    }
    return (
      <div>
        <button onClick={() => this.setState({ form: 'Sign Up' })}>
          Sign Up
        </button>
        <button onClick={() => this.setState({ form: 'Sign In' })}>
          Sign In
        </button>
        <UserForm
          form={this.state.form}
          createUser={this.createUser}
          signIn={this.signIn}
        />
      </div>
    );
  }

  createUser(user) {
    console.log('new user:', user);
  }

  signIn(credentials) {
    console.log('user credentials:', credentials);
  }
}
export default App;
