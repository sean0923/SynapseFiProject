import React, { Component } from 'react'

import { Segment, Form, Input, Button } from 'semantic-ui-react'


class FormEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legal_names: '',
      password: '',
      email: '',
      phone_numbers: '',
      nickname: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.handleNickameChange = this.handleNickameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) { this.setState({ legal_names: e.target.value }); }
  handlePasswordChange(e) { this.setState({ password: e.target.value }); }
  handleEmailChange(e) { this.setState({ email: e.target.value }); }
  handlePhoneNumChange(e) { this.setState({ phone_numbers: e.target.value }); }
  handleNickameChange(e) { this.setState({ nickname: e.target.value }); }
  handleSubmit() {
    let userData = {
      legal_names: this.state.legal_names,
      password: this.state.password,
      email: this.state.email,
      phone_numbers: this.state.phone_numbers,
      nickname: this.state.nickname,
    };
    this.props.createUser(userData);
  }

  render() {
    return (
      <Form>
        <Form.Field required>
          <label>Full Name</label>
          <Input onChange={this.handleNameChange} value={this.state.legal_names} placeholder="Full name" />
          <label>Password</label>
          <Input type="password" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Password" />
          <label>Email</label>
          <Input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email" />
          <label>Phone Number</label>
          <Input onChange={this.handlePhoneNumChange} value={this.state.phone_numbers} placeholder="Phone Number" />
          <label>Nick Name</label>
          <Input onChange={this.handleNickameChange} value={this.state.nickname} placeholder="Full name" />
        </Form.Field>
        <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
      </Form>
    );
  }
}

export default FormEx;
