import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import MiniItem from './MiniItem.js';
import MiniItemRow from './MiniItemRow.js';
import {useParams} from 'react-router-dom';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        response:null,
        username:this.props.username,
        search:"Recommended",
        items:[]
    }
    connectedToServer(connected){
        if(connected){
            this.setState(
                {
                    items: this.state.response
                }
            );
        }else{

        }
    }
    homeFetch(SEARCH_INFOMATION){
        let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
        let serverRoute="/Search:";
        fetch( mysqlServer + serverRoute + JSON.stringify(SEARCH_INFOMATION))
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result.miniItems);
            this.setState({
                response:result.miniItems
            });
            console.log("CONNECTTED TO SERVER");
            this.connectedToServer(true);
          },
          
          (error) => {
           
            console.log("FAILED TO CONNECT TO SERVER");
            this.connectedToServer(false);
          }
         

        )
      }
    updateWebcontainer(){
        let {search, username} = this.props.match.params;
        console.log(this.state.username+ " -> " + username + "\n " + this.state.search + " " +  search);
        if(!(username == this.state.username)){
            console.log("Home -> Update.username")
            this.setState(
                {
                    username:username,
                }
            );
            this.props.parentCallBackFunction({search:search,username:username})
        }
        if(!(this.state.search == search)){
            console.log("Home -> Update.search");
            this.setState(
                {
                    search:search,
                   
                }
            );
            this.homeFetch({search:search});

        }
        console.log("Home -> NO UPDATE")
        

    }
    render(){

    //const { search } = ;

        this.updateWebcontainer();
        return (
            <div>
                <MiniItemRow items={this.state.items}/>
            </div>

        );
    }
}
export default Home;