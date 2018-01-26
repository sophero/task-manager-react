import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      user: props.user,
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ form: newProps.form });
  }

  render() {
    let submitBtnText = this.props.form;

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
          onChange={event => this.updateName(event.target.value)}
        />
      );
      confirmPasswordInput = (
        <input
          placeholder="Confirm password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={event => this.updateConfirmPassword(event.target.value)}
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
            onChange={event => this.updateEmail(event.target.value)}
          />
          <input
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={event => this.updatePassword(event.target.value)}
          />
          {confirmPasswordInput}
          <button type="submit">{submitBtnText}</button>
        </form>
      </div>
    );
  }

  onFormSubmit(event) {
    event.preventDefault();
    let form = this.props.form;
    // check passwords match if signing up new user or changing existing password
    let user = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    if (form === 'Sign Up') {
      user.name = event.target.name.value;
      this.props.createUser(user);
    } else if (form === 'Sign In') {
      this.props.signIn(user);
      // } else if (form === 'Update') {
      //   this.props.update(event.target);
    }
  }

  updateName(name) {
    this.setState({ name });
  }
  updateEmail(email) {
    this.setState({ email });
  }
  updatePassword(password) {
    this.setState({ password });
  }
  updateConfirmPassword(confirmPassword) {
    this.setState({ confirmPassword });
  }
}

export default UserForm;
