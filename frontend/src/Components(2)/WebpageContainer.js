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


class WebpageContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          currentTab: "Home"
        };
}
//static contextType = UserContext;

callBackFunction = (data) => {
  console.log("Selected: " + data);
  
  this.setState(
    {
      currentTab: data
    }
  );
}

render(){
  console.log("Current Tab:" + this.state.currentTab);
  let page = "";
  // page = this.SwitchPage1();


return ( 
  <Router>
     <Layout >
        <WebpageNav parentCallBackFunction = {this.callBackFunction}/>
        <ItemSearch/>   
        <Switch> 
            <Route path="/" exact component={Home}/>  
            <Route path="/Home" exact component={Home}/>
            <Route path="/Login" exact component={Login}/>
            <Route path="/Cart" exact component={Cart}/>
            <Route path="/Sell" exact component={Sell}/>
            <Route path="/PreviousOrders" exact component={PreviousOrders}/>
            <Route path="/AccountSettings" exact component={AccountSettings }/>
            <Route path="/Signup" exact component={Signup}/>
            <Route path="/Item" exact component={Item}/>
            <Route path="/Checkout" exact component={Checkout}/>
        </Switch>
      
      </Layout>
    </Router>
    );
        }
}
export default WebpageContainer;