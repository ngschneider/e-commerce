import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import UserContext from './UserProvider.js'
import {Redirect} from 'react-router-dom';
import s4 from './images/Tshirt4.jpg';
class MiniItem extends React.Component{
//constructor for arrray of product,picture
constructor(props){
        super(props);
        this.state = {
            currentTab: 'MiniItem',
            itemSelected: false,
            item:null
        };
    }
    //static contextType = UserContext

handleChange(SELECTED_ITEM){
    this.setState({
        itemSelected: true,
        item:SELECTED_ITEM
    });
    
}
    render(){
      //  const { tab, setUser } = this.context;
      if(!this.state.itemSelected){
        return (
            
                <div>
                    <img onClick={() => this.handleChange(this.props.uniqueid)}src ={s4} alt={"ALT"} height = "300px" width = "300px"/>      
                    <center>{this.props.name}</center>
                </div>
            
        );
      }else{
          let routePath = "/Item" + this.item ;
          console.log("unique id"+ this.props.uniqueid)
          return (
            <Redirect to={{
                pathname:"/Item",
                state:{
                    uniqueid:this.props.uniqueid
                }
            }}/>
          );
      }
    }
}
export default MiniItem;