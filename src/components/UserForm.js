import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      user: props.user,
      errorMsg: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ form: newProps.form, user: newProps.user });
  }

  render() {
    let placeholders = {
      name: 'First name',
      email: 'Email address'
    };
    if (this.state.form === 'Update') {
      placeholders.name = this.state.user.name;
      placeholders.email = this.state.user.email;
    }

    let nameInput, confirmPasswordInput;

    if (this.state.form !== 'Sign In') {
      nameInput = (
        <input
          placeholder={placeholders.name}
          name="name"
          value={this.state.fname}
          onChange={event => this.setState({ name: event.target.value })}
        />
      );
      confirmPasswordInput = (
        <input
          placeholder="Confirm password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={event =>
            this.setState({ confirmPassword: event.target.value })
          }
        />
      );
    }
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          {nameInput}
          <input
            placeholder={placeholders.email}
            name="email"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          {confirmPasswordInput}
          <button type="submit">{this.props.form}</button>
          <span>{this.state.errorMsg}</span>
        </form>
      </div>
    );
  }

  onFormSubmit(event) {
    event.preventDefault();
    let form = this.props.form;
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    if (form === 'Sign Up') {
      if (event.target.password.value !== event.target.confirmPassword.value) {
        this.setState({ errorMsg: 'Passwords do not match.' });
        return;
      }
      user.name = event.target.name.value;
      this.props.createUser(user);
    } else if (form === 'Sign In') {
      this.props.signIn(user);

      // } else if (form === 'Update') {
      //   this.props.update(event.target);
    }
  }
}

export default UserForm;
