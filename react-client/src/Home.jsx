import React from 'react';
import axios from 'axios';
import { Button, Loader, Form, Segment, Icon } from 'semantic-ui-react';

import UserDropDown from './components/UserDropDown.jsx';
import NodeDropDown from './components/NodeDropDown.jsx';
import TransHistBox from './components/TransHistBox.jsx';
import PeopleBox from './components/PeopleBox.jsx';
import ProfileBox from './components/ProfileBox.jsx';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      usersDropDownOption: [],
      selectedFromUser: {},
      selectedFromNode: {},
      nodeDropDownFromOptions: [],
      selectedToUser: {},
      selectedToNode: {},
      nodeDropDownToOptions: [],
      justCreatedUser: {},
      transactionHistory: [],
      amout: undefined,
    };
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.createNode = this.createNode.bind(this);
    this.updateSelectedUser = this.updateSelectedUser.bind(this);
    this.getAllNodes = this.getAllNodes.bind(this);
    this.getOneNode = this.getOneNode.bind(this);
    this.create_ACH_US_Node = this.create_ACH_US_Node.bind(this);
    this.updateSelectedNode = this.updateSelectedNode.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
    this.getAllTransactions = this.getAllTransactions.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    let selectedUserId = nextProps.justCreatedUser.json._id
    axios.post('/api/user/getUser', { selectedUserId })
      .then((user) => {
        this.setState({ selectedFromUser: user.data }, () => {
          this.getAllNodes('from');
        });
      });
  }

  getUser() {
    axios.post('/api/user/getUser', this.state.selectedFromUser)
      .then((data) => {
        console.log(data.data);
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

  createUser(userData) {
    axios.post('/api/user/createUser', userData)
      .then((user) => {
        console.log(user.data);
        this.setState({
          justCreatedUser: user.data
        }, () => {
          this.createNode(userData.nickname);
        });
      });
  }

  getAllNodes(fromOrTo) {
    let selectedUser;
    if (fromOrTo === 'from') selectedUser = this.state.selectedFromUser;
    else selectedUser = this.state.selectedToUser;

    axios.post('/api/node/getAllNodes', selectedUser)
      .then((data) => {
        // console.log(data.data);
        return data.data.nodes;
      })
      .then((nodes) => {
        console.log(nodes);
        let nodeDropDownOptions = nodes.map((node, idx) => {
          // console.log('INFO!!', node.info.bank_name);
          if (node.type === 'ACH-US') {
            return ({
              key: node._id,
              value: idx,
              text: `${node.info.bank_name} (${node.type})`,
              back_name: node.info.bank_name
            });
          }
          return ({
            key: node._id,
            value: idx,
            text: `${node.info.nickname} (${node.type})`,
            nickname: node.info.nickname
          });
        });
        if (fromOrTo === 'from') {
          this.setState({ nodeDropDownFromOptions: nodeDropDownOptions }, () => {
            this.updateSelectedNode(0, fromOrTo);
          });
        } else {
          this.setState({ nodeDropDownToOptions: nodeDropDownOptions });
        }
      });
  }

  getOneNode() {
    axios.post('/api/node/getOneNode', this.state.selectedFromUser)
      .then((data) => {
        // console.log(data.data);
        return data.data.nodes;
      })
  }

  createNode(nickname) {
    let postData = {
      user: this.state.justCreatedUser,
      nickname
    };
    axios.post('/api/node/createNode', postData)
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

  updateSelectedUser(idx, fromOrTo) {
    let selectedUserId = this.state.allUsers[idx]._id;
    axios.post('/api/user/getUser', { selectedUserId })
      .then((user) => {
        if (fromOrTo === 'from') {
          this.setState({ selectedFromUser: user.data }, () => {
            this.getAllNodes(fromOrTo);
          });
        } else {
          this.setState({ selectedToUser: user.data }, () => {
            this.getAllNodes(fromOrTo);
          });
        }
      });
  }

  updateSelectedNode(idx, fromOrTo) {
    let selectedNode_id;
    let selectedUser;
    if (fromOrTo === 'from') {
      selectedUser = this.state.selectedFromUser;
      selectedNode_id = this.state.nodeDropDownFromOptions[idx].key;
    } else {
      selectedUser = this.state.selectedToUser;
      selectedNode_id = this.state.nodeDropDownToOptions[idx].key;
    }
    let postData = { selectedNode_id, selectedUser };
    axios.post('/api/node/getOneNode', postData)
      .then((node) => {
        if (fromOrTo === 'from') {
          this.setState({ selectedFromNode: node.data });
        } else {
          this.setState({ selectedToNode: node.data });
        }
      });
  }

  createTransaction() {
    let postData = {
      fromNode: this.state.selectedFromNode,
      toNode: this.state.selectedToNode,
      amount: this.state.amount,
    };
    axios.post('/api/transaction/createTransaction', postData)
      .then((data) => {
        let transactionData = data.data.json;
        let historyData = {
          user: this.state.selectedToUser.json.legal_names[0],
          nodeType: transactionData.to.type,
          transactionId: transactionData._id,
          amount: transactionData.amount.amount,
        };
        let transactionHistory = this.state.transactionHistory.concat(historyData);
        this.setState({
          transactionHistory,
          amount: '',
        });
      })
      .then(() => {
        this.getAllTransactions();
      });
  }

  getAllTransactions() {
    axios.post('/api/transaction/getAllTransactions', this.state.selectedFromNode)
      .then((data) => {
      });
  }

  handleAmountChange(e) {
    this.setState({
      amount: e.target.value
    });
  }

  render() {
    return (
      <div className="main">

        <div id="mainContainer">
          <div className="pay">
            <div className="to">
              <h2> To: </h2>
              <UserDropDown
                fromOrTo={'to'}
                usersDropDownOption={this.state.usersDropDownOption}
                updateSelectedUser={this.updateSelectedUser}
              />
            </div>
            <div className="node">
              <h2>Node:</h2>
              <NodeDropDown
                fromOrTo={'to'}
                nodeDropDownOptions={this.state.nodeDropDownToOptions}
                updateSelectedNode={this.updateSelectedNode}
              />
            </div>
            <div className="amount">
              <Form>
                <Form.Field required>
                  <Form.Input
                    fluid
                    icon="dollar"
                    iconPosition="left"
                    onChange={this.handleAmountChange}
                    value={this.state.amount}
                    placeholder="Amount"
                  />
                </Form.Field>
              </Form>
            </div>
            <div className="payBtn">
              <Button onClick={this.createTransaction} color="teal" fluid size="large">
                Pay
              </Button>
            </div>
          </div>

          <TransHistBox transactionHistory={this.state.transactionHistory} />

          <ProfileBox
            nodeDropDownFromOptions={this.state.nodeDropDownFromOptions}
            justCreatedUser={this.props.justCreatedUser}
          />

          <PeopleBox usersDropDownOption={this.state.usersDropDownOption} />
        </div>
      </div>
    );
  }
}

export default App;
