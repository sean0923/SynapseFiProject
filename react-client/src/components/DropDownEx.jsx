import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class DropDownEx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { value }) {
    console.log(value);
    this.props.updateSelectedUser(value, this.props.fromOrTo);
  }

  render() {
    return (
      <div>
        <Dropdown
          onChange={this.handleChange}
          search
          selection
          options={this.props.usersDropDownOption}
          placeholder='Choose an option'
        />
      </div>
    )
  }
}


// const DropDownEx = ({ usersDropDownOption }) => (
//   <Dropdown search selection options={usersDropDownOption} placeholder='Choose an option' />
// );

export default DropDownEx;