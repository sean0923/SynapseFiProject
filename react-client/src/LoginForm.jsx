import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Input } from 'semantic-ui-react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LoginForm extends Component {
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

  handleNameChange(e) {
    this.setState({ legal_names: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePhoneNumChange(e) {
    this.setState({ phone_numbers: e.target.value });
  }
  handleNickameChange(e) {
    this.setState({ nickname: e.target.value });
  }
  handleSubmit() {
    const userData = {
      legal_names: this.state.legal_names,
      password: this.state.password,
      email: this.state.email,
      phone_numbers: this.state.phone_numbers,
      nickname: this.state.nickname,
    };
    console.log('is it ????');
    this.props.createUser(userData);
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Create SYNAPSE-US Account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Field required>
                  <Form.Input
                    fluid
                    icon="user outline"
                    iconPosition="left"
                    onChange={this.handleNameChange}
                    value={this.state.legal_names}
                    placeholder="Full name"
                  />

                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    type="password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="Password"
                  />

                  <Form.Input
                    fluid
                    icon="mail outline"
                    iconPosition="left"
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    placeholder="Email"
                  />

                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    onChange={this.handlePhoneNumChange}
                    value={this.state.phone_numbers}
                    placeholder="Phone Number"
                  />

                  <Form.Input
                    fluid
                    icon="credit card alternative"
                    iconPosition="left"
                    onChange={this.handleNickameChange}
                    value={this.state.nickname}
                    placeholder="Account Nickname"
                  />
                </Form.Field>

                <Link to="/home">
                  <Button onClick={this.handleSubmit} color="teal" fluid size="large">
                    Submit
                  </Button>
                </Link>
                
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
