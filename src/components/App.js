import React, { Component } from 'react';
import axios from 'axios';

import UserForm from './UserForm';
import UserHome from './UserHome';

const url = 'http://localhost:3002';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      token: null,
      form: 'Sign In'
    };
    this.createUser = this.createUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.saveUserToState = this.saveUserToState.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  render() {
    console.log(this.state);
    if (this.state.user) {
      return (
        <UserHome
          user={this.state.user}
          token={this.state.token}
          signOut={this.signOut}
        />
      );
    }
    let signInTabClass = 'btn';
    let signUpTabClass = 'btn';
    if (this.state.form === 'Sign In') {
      signInTabClass = 'btn-selected';
    } else if (this.state.form === 'Sign Up') {
      signUpTabClass = 'btn-selected';
    }
    return (
      <div>
        <div
          onClick={() => this.setState({ form: 'Sign Up' })}
          className={signUpTabClass}
        >
          Sign Up
        </div>
        <div
          onClick={() => this.setState({ form: 'Sign In' })}
          className={signInTabClass}
        >
          Sign In
        </div>
        <UserForm
          form={this.state.form}
          user={this.state.user}
          createUser={this.createUser}
          signIn={this.signIn}
        />
      </div>
    );
  }

  createUser(user) {
    axios
      .post(`${url}/users`, user)
      .then(response => this.saveUserToState(response))
      .catch(e => console.log(e));
  }

  saveUserToState(response) {
    this.setState({
      user: response.data,
      token: response.headers['x-auth'],
      form: 'Sign Out'
    });
  }

  signIn(credentials) {
    axios
      .post(`${url}/users/login`, credentials)
      .then(response => this.saveUserToState(response))
      .catch(e => console.log(e));
  }

  signOut(token) {
    axios({
      method: 'delete',
      url: `${url}/users/me/token`,
      headers: { 'x-auth': token }
    })
      .then(response => {
        this.setState({ user: null, token: null, form: 'Sign In' });
      })
      .catch(e => console.log(e));
  }
}
export default App;
