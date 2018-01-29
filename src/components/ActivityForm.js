import React, { Component } from 'react';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      name: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder="Activity name"
            name="name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
          <button type="submit">{this.props.form}</button>
          <span>{this.state.errorMsg}</span>
        </form>
      </div>
    );
  }

  onFormSubmit(event) {
    event.preventDefault();
    let form = this.props.form;
    if (form === 'create') {
      this.props.createActivity({ name: event.target.name.value });
    }
  }
}

export default ActivityForm;
