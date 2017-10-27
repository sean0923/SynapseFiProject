import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ThemingLayout from './components/ThemingLayout.jsx';
import Buttons from './components/Buttons.jsx';
import TableOfUsers from './components/TableOfUsers.jsx';
import DropDownEx from './components/DropDownEx.jsx'
import NodeDropDownEx from './components/NodeDropDownEx.jsx'
import FormEx from './components/FormEx.jsx';
import NodeForm from './components/NodeForm.jsx';
import TableEx from './components/TableEx.jsx';

import { Button, Menu, Loader, Form, Segment, Icon } from 'semantic-ui-react';

// import { Loader } from 'semantic-ui-react'

// import ReactRouter from 'react-router-dom';
// const Router = ReactRouter.BrowserRouter;
// const Route = ReactRouter.Route;


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
  }

  componentDidMount() {
    this.getAllUsers();
    // let selectedUserId = this.props.justCreatedUser.json._id
    // console.log('componenet did mount', selectedUserId);
    // axios.post('/api/user/getUser', { selectedUserId })
    //   .then((user) => {
    //     this.setState({ selectedFromUser: user.data }, () => {
    //       this.getAllNodes('from');
    //     });
    //   });
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
            return ({ key: node._id, value: idx, text: `${node.info.bank_name} (${node.type})` });
          }
          // return ({ key: idx, value: idx, text: node.type, name: node.info.nickname});
          return ({ key: node._id, value: idx, text: `${node.info.nickname} (${node.type})` });
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
    }
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
      console.log('selectedUser:', selectedUser.json);
    }
    let postData = { selectedNode_id, selectedUser };
    axios.post('/api/node/getOneNode', postData)
      .then((node) => {
        if (fromOrTo === 'from') {
          this.setState({ selectedFromNode: node.data });
        } else {
          console.log('at selected to node');
          console.log('at selected to node', node.data);
          this.setState({ selectedToNode: node.data });
        }
      });
  }

  createTransaction() {
    let postData = {
      fromNode: this.state.selectedFromNode,
      toNode: this.state.selectedToNode,
      money: 10000
    };
    axios.post('/api/transaction/createTransaction', postData)
      .then((data) => {
        // console.log('transaction data:', data);
        let transactionData = data.data.json;
        let historyData = {
          user: this.state.selectedToUser.json.legal_names[0],
          nodeType: transactionData.to.type,
          transactionId: transactionData._id,
          amount: transactionData.amount.amount,
        };
        let transactionHistory = this.state.transactionHistory.concat(historyData);
        this.setState({ transactionHistory });
      })
      .then(() => {
        this.getAllTransactions();
      });
  }

  getAllTransactions() {
    axios.post('/api/transaction/getAllTransactions', this.state.selectedFromNode)
      .then((data) => {
        // console.log('what??');
        // console.log('all transaction data:', data.data.trans);
        // data.data.trans.forEach((tran) => {
        //   console.log('tran', tran._id, tran.to.id, tran.to.nickname);
        // });
      });
  }

  render() {
    let userInfoDiv;
    if (this.state.nodeDropDownFromOptions.length === 0) {
      userInfoDiv = (
        <div>
          <h1>Waiting ~~~</h1>
          <Loader active inline />
        </div>
      );
    } else {
      let userName = this.props.justCreatedUser.json.legal_names;
      let accountName = this.state.nodeDropDownFromOptions[0].text
      userInfoDiv = (
        <div>
          <div>
            <h2> {userName} </h2> 
            {/* {console.log('not working', this.props.justCreatedUser.json.legal_names)}   */}
          </div>

          <div>
            <h2>My Node: {accountName}</h2>
            {/* <h2>My SYNAPSE-US Node: { this.state.nodeDropDownFromOptions[0] }</h2>  */}
            {/* { console.log('what about', this.state.nodeDropDownFromOptions[0]) } */}
          </div>
        </div>
      );      
    }
    return (
      <div className="main">

        <div id="mainContainer">
          <div className="pay">
            <div className="to">
              <h2> To: </h2>
              <DropDownEx
                fromOrTo={'to'}
                usersDropDownOption={this.state.usersDropDownOption}
                updateSelectedUser={this.updateSelectedUser}
              />
            </div>
            <div className="node">
              <h2>Node:</h2>
              <NodeDropDownEx
                fromOrTo={'to'}
                nodeDropDownOptions={this.state.nodeDropDownToOptions}
                updateSelectedNode={this.updateSelectedNode}
              />
            </div>
            <div className="amount">
              <Form.Input
                fluid
                icon="dollar"
                iconPosition="left"
                onChange={this.handleNameChange}
                value={this.state.legal_names}
                placeholder="Amount"
              />
            </div>
            <div className="payBtn">
              <Button onClick={this.handleSubmit} color="teal" fluid size="large">
                Pay
              </Button>
            </div>
          </div>
          <div className="history">history</div>
          <div className="profile">
            <h2>Profile:</h2>
            <Segment stacked>
              <div className="profileSmallBox">
                <Icon name="user outline" />
                Full name
              </div>
              <div className="profileSmallBox">
                <Icon name="credit card alternative" />
                Node type
              </div>
            </Segment>
          </div>

          <div className="people">people</div>

        </div>
      

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

        <div className="mainBox">
          {userInfoDiv}
        </div>
        <div className="mainBox">
          <h1>Transfer Money To:</h1>
          <DropDownEx
            fromOrTo={'to'}
            usersDropDownOption={this.state.usersDropDownOption}
            updateSelectedUser={this.updateSelectedUser}
          />

          <NodeDropDownEx
            fromOrTo={'to'}
            nodeDropDownOptions={this.state.nodeDropDownToOptions}
            updateSelectedNode={this.updateSelectedNode}
          />
        </div>



        { console.log('fromUser', this.state.selectedFromUser) }

        <div className="mainBox">
          <h1>My Transaction History</h1>
        </div>
        <div className="tableBox">
          <TableEx transactionHistory={this.state.transactionHistory} />
        </div>
      </div>
    );
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('app'));

