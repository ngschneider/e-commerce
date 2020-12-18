import React from 'react';
import { Layout ,Affix} from 'antd';
import WebpageNav from './WebpageNav.js';
import ItemSearch from './ItemSearch.js';
import Item from './Item.js';
import Login from './Login.js';
import Cart from './Cart.js'
import Home from './Home.js'
import Sell from './Sell.js';
import AccountSettings from './AccountSettings.js';
import UserContext from './UserProvider.js'
import Signup from './Signup.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import PreviousOrders from './PreviousOrders.js';
import Checkout from './Checkout.js';
import AddItem from './AddItem.js';
import AddItemConfirmation from './AddItemConfirmation.js';


class WebpageContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          currentTab: "Home",
          username:"Not-Logged-In",
          login:false,
          search:"Recommended"
        };
        console.log("constructor");
}
//static contextType = UserContext;

homeCallBackFunction = (data) => {
  console.log(data.username);
  this.setState({
    username:data.username,
    search:data.search
  });
}

render(){
  //console.log("Current Tab:" + this.state.currentTab);
  // page = this.SwitchPage1();
return ( 
  <Router>
     <Layout >
        <WebpageNav username={this.state.username}/>
        <ItemSearch username={this.state.username}/>   
        <Switch> 
            <Route path="/" exact component={Home}/>  
            <Route path="/Home/:search/:username" exact component={(props)=> <Home {...props}parentCallBackFunction = {this.homeCallBackFunction}  username={this.state.username} /> } />
            <Route path="/Login" exact component={Login}/>
            <Route path="/Cart/:username" exact component={(props)=> <Cart {...props} username={this.state.username}/>}/>
            <Route path="/Sell/:username" exact component={(props)=> <Sell {...props} username={this.state.username}/>}/>
            <Route path="/PreviousOrders/:username" exact component={(props)=> <PreviousOrders {...props} username={this.state.username}/>}/>
            <Route path="/AccountSettings/:username" exact component={(props)=> <AccountSettings {...props} username={this.state.username}/> }/>
            <Route path="/Signup" exact component={Signup}/>
            <Route path="/Item" exact component={(props)=> <Item {...props} name={"Laptop"}miniDescription={"mac book pro, High definition"} price={"1000.00"} username={this.state.username}/> }/>
            <Route path="/Checkout" exact component={Checkout}/>
            <Route path="/AddItem/:username" exact component={(props) => <AddItem {...props} username={this.state.username}/>}/>
            <Route path="/AddItem/Confirmation/:username" exact component={(props) => <AddItemConfirmation {...props} username={this.state.username}/>}/>
        </Switch>
      
      </Layout>
    </Router>
    );
        }
}
export default WebpageContainer;