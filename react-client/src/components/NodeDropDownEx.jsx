import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class NodeDropDownEx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { value }) {
    console.log(value);
    this.props.updateSelectedNode(value, this.props.fromOrTo);
  }

  render() {
    console.log('here!!:', this.props.fromNodeDropDownOptions);
    return (
      <div>
        <Dropdown
          onChange={this.handleChange}
          search
          selection
          options={this.props.fromNodeDropDownOptions}
          placeholder='Choose an option'
        />
      </div>
    );
  }
}



export default NodeDropDownEx;