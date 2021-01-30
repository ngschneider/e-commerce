import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import UserContext from './UserProvider.js'
import {Redirect} from 'react-router-dom';

import s4 from './images/Tshirt4.jpg';
import './CSS_FILES/MiniItem.css';

class MiniItem extends React.Component{
//constructor for arrray of product,picture
constructor(props){
        super(props);
        this.state = {
            currentTab: 'MiniItem',
            itemSelected: null,
        };
    }
    //static contextType = UserContext

handleChange = (SELECTED_ITEM) =>{
    this.setState({
        itemSelected: SELECTED_ITEM,
    });
    
}
    render(){
      //  const { tab, setUser } = this.context;
      if(!this.state.itemSelected){
        return (
            
                <div>
                    <img onClick={() => this.handleChange("T-Shirt-Bundle")}src ={s4} alt="test" height = "300px" width = "300px"/>      
                    <center>T-Shirt Bundle</center>
                </div>
            
        );
      }else{
          return (
            <Redirect to="/Item"/>
          );
      }
    }
}
export default MiniItem;