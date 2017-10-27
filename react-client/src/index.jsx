import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import LoginForm from './LoginForm.jsx';
import Home from './Home.jsx';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCreatedUser: {},
    };
    this.createUser = this.createUser.bind(this);
    this.createNode = this.createNode.bind(this);
  }

  createUser(userData) {
    axios.post('/api/user/createUser', userData).then((user) => {
      this.setState(
        {
          justCreatedUser: user.data,
        },
        () => {
          this.createNode(userData.nickname);
        },
      );
    });
  }

  createNode(nickname) {
    const postData = {
      user: this.state.justCreatedUser,
      nickname,
    };
    axios.post('/api/node/createNode', postData).then((node) => {
    });
  }

  render() {
    return (
      <Router>
        <div>
          
          <div id="header"> <h1>Easy Pay with SynapseFi</h1> </div>
           {/* <Home/>  */}
          <Switch>
            <Route exact path={'/'} render={() => <LoginForm createUser={this.createUser} />} />
            <Route
              path={'/home'}
              render={() => <Home justCreatedUser={this.state.justCreatedUser} />}
            />
          </Switch>  
        </div>
      </Router>
    );
  }
}

// const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
//   <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
//     <div className={match ? 'active' : ''}>
//       {match ? '> ' : ''}<Link to={to}>{label}</Link>
//     </div>
//   )}/>
// )

// const Home = () => (
//   <div>
//     <h2>Home</h2>
//   </div>
// )

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
