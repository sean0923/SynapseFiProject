import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'

class Buttons extends Component {
  render() {
    return (
      <div>
        <Button>Default</Button>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
        <Button basic>Basic</Button>
        <Button compact>Compact</Button>
      </div>
    )
  }
}

export default Buttons;
