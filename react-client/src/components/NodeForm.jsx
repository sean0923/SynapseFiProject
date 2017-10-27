import React, { Component } from 'react'

import { Segment, Form, Input, Button } from 'semantic-ui-react'


class NodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) { this.setState({ nickname: e.target.value }); }
  handleSubmit() {
    this.props.createNode(this.state.nickname);
  }

  render() {
    return (
      <Form>
        <Form.Field required>
          <label>Nick Name</label>
          <Input onChange={this.handleNameChange} value={this.state.nickname} placeholder="Full name" />
        </Form.Field>
        <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
      </Form>
    );
  }
}

export default NodeForm;
