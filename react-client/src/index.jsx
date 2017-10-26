import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ThemingLayout from './components/ThemingLayout.jsx';
import Buttons from './components/Buttons.jsx';
import TableOfUsers from './components/TableOfUsers.jsx';
import DropDownEx from './components/DropDownEx.jsx'
import NodeDropDownEx from './components/NodeDropDownEx.jsx'

import { Button } from 'semantic-ui-react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      usersDropDownOption: [],
      nodesDropDownOption: [],
      selectedFromUser: {},
      selectedFromNode_id: undefined,
      selectedFromNode: {},
      selectedToUser: {},
      selectedToNode_id: undefined,
      selectedToNode: {},
    };
    this.getUser = this.getUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.createNode = this.createNode.bind(this);
    this.updateSelectedUser = this.updateSelectedUser.bind(this);
    this.getAllNodes = this.getAllNodes.bind(this);
    this.getOneNode = this.getOneNode.bind(this);
    this.create_ACH_US_Node = this.create_ACH_US_Node.bind(this);
    this.updateSelectedNode = this.updateSelectedNode.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.getAllTransactions = this.getAllTransactions.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getUser() {
    axios.post('/api/user/getUser', this.state.selectedFromUser)
      .then((data) => {
        console.log(data.data);
        // return Users.data;
      });
  }

  getAllUsers() {
    axios.get('/api/user/getAllUsers')
      .then((Users) => {
        // console.log(Users);
        return Users.data;
      })
      .then((allUsers) => {
        let usersDropDownOption = allUsers.map((user, idx) => {
          return ({ key: idx, value: idx, text: user.legal_names[0] });
        });
        this.setState({
          allUsers,
          usersDropDownOption
        });
      });
  }

  getAllNodes() {
    axios.post('/api/node/getAllNodes', this.state.selectedFromUser)
      .then((data) => {
        // console.log(data.data);
        return data.data.nodes;
      })
      .then((nodes) => {
        console.log(nodes);
        let nodesDropDownOption = nodes.map((node, idx) => {
          console.log('INFO!!', node.info.bank_name);
          if (node.type === 'ACH-US') {
            return ({ key: node._id, value: idx, text: `${node.info.bank_name} (${node.type})` });
          }
          // return ({ key: idx, value: idx, text: node.type, name: node.info.nickname});
          return ({ key: node._id, value: idx, text: `${node.info.nickname} (${node.type})`});
        });
        this.setState({
          nodesDropDownOption
        });
      });
  }

  getOneNode() {
    axios.post('/api/node/getOneNode', this.state.selectedFromUser)
      .then((data) => {
        // console.log(data.data);
        return data.data.nodes;
      })
  }

  createNode() {
    axios.post('/api/node/createNode', this.state.selectedFromUser)
      .then((Users) => {
        console.log(Users.data);
        console.log(Users.data._id);
        console.log(Users.data._links);
        // return Users.data;
      });
  }

  create_ACH_US_Node() {
    axios.post('/api/node/create_ACH_US_Node', this.state.selectedFromUser)
      .then((Users) => {
        console.log(Users.data);
        console.log(Users.data._id);
        console.log(Users.data._links);
        // return Users.data;
      });
  }

  updateSelectedUser(idx) {
    let selectedUserId = this.state.allUsers[idx]._id;
    axios.post('/api/user/getUser', { selectedUserId })
      .then((data) => {
        let selectedUser = data.data;
        this.setState({
          selectedUser
        }, () => {
          this.getAllNodes();
        });
      });
  }

  updateSelectedNode(idx) {
    let selectedNode_id = this.state.nodesDropDownOption[idx].key;
    let selectedUser = this.state.selectedFromUser;
    let postData = { selectedNode_id, selectedUser };
    axios.post('/api/node/getOneNode', postData)
      .then((data) => {
        console.log('this is oneNode', data.data);
        let selectedNode = data.data;
        this.setState({
          selectedNode
        });
      });
  }

  createTransaction() {
    let postData = { node: this.state.selectedNode, money: 10000}
    axios.post('/api/transaction/createTransaction', postData)
      .then((data) => {
        console.log('transaction data:', data);
      });
  }

  getAllTransactions() {
    axios.post('/api/transaction/getAllTransactions', this.state.selectedNode)
      .then((data) => {
        console.log('all transaction data:', data);
      });
  }

  render() {
    return (
      <div className="main">
        <div className="mainBox">
          <Button onClick={this.getAllUsers}>Get All Users</Button>
          <Button onClick={this.getUser}>Get One Users</Button>
          <Button onClick={this.createNode}>Create Node</Button>
          <Button onClick={this.create_ACH_US_Node}>Create ACH-US Node</Button>
          <Button onClick={this.getAllNodes}>Get All Nodes</Button>
          <Button onClick={this.createTransaction}>Create Transaction</Button>
          <Button onClick={this.getAllTransactions}>get All Transactions</Button>
          <Button>Default</Button>
        </div>


        {console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!')}
        {console.log(this.state.selectedNode)}
        {console.log(this.state.selectedFromNode)}

        <div className="mainBox">
          <h1>From:</h1>
          <DropDownEx
            usersDropDownOption={this.state.usersDropDownOption}
            updateSelectedUser={this.updateSelectedUser}
          />

          <NodeDropDownEx
            nodesDropDownOption={this.state.nodesDropDownOption}
            updateSelectedNode={this.updateSelectedNode}
          />
        </div>

        <div className="mainBox">
          <h1>To:</h1>
          <DropDownEx
            usersDropDownOption={this.state.usersDropDownOption}
            updateSelectedUser={this.updateSelectedUser}
          />

          <NodeDropDownEx
            nodesDropDownOption={this.state.nodesDropDownOption}
            updateSelectedNode={this.updateSelectedNode}
          />          
        </div>
        {/* <ThemingLayout /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));