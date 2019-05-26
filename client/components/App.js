import React, { Component } from 'react';
import './../css/App.css';
import { Button } from 'antd';
import Navbar from './Navbar.jsx'
import AuthNavbar from './AuthNavbar.jsx'
import Intro from './Intro.jsx'
import Routes from './../routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class App extends Component {
 constructor(props){
  super(props); 
  this.state= {
    isOpen:false
  };
  this.onToggleOpen=this.onToggleOpen.bind(this);
 }
 onToggleOpen(){
  this.setState({ isOpen:!this.state.isOpen });
 }
  render() {
    return (
      <div className="App">
        
        {!this.props.auth.isAuthenticated ? <Navbar></Navbar> : <AuthNavbar ></AuthNavbar>}
     <Routes/>
      
	</div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(App));
