import React from "react";
import { Table, Divider, Button } from "antd";
import {Redirect} from 'react-router-dom';

class Cart extends React.Component {
    
    constructor(props){
        super(props);
    }
    state = {
        response: null,
        checkout: false,
        success: false,
        data: null
    }

     col = [
        {
            title: "Item Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Quantity",
            dataIndex: "Quantity",
            key: "Quantity",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Price",
            dataIndex: "Price",
            key: "Price",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Subtotal",
            dataIndex: "SubTotal",
            key: "SubTotal",
            render: (text) => <a>{text}</a>,
        },

        ];
        data = [
            {
                name: "T-Shirt",
                Quantity: "100",
                Price: "$19.95",
                SubTotal: "$1995.00",
            },
            {
                name: "Pants",
                Quantity: "10",
                Price: "$25.00",
                SubTotal: "$250.00",
            },
            {
                name: "Mtn Dew 12 pack",
                Quantity: "1",
                Price: "$5.00",
                SubTotal: "$5.00",
            },
            {
                name: "Mac Book Pro",
                Quantity: "2",
                Price: "$2000",
                SubTotal: "$4000",
            },
        ]
        cartFetch(USERNAME){
            //console.log(LOGIN_INFORMATION);
           // console.log(JSON.stringify(LOGIN_INFORMATION));
            let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
            let serverRoute="/Cart:";
            fetch( mysqlServer + serverRoute + "" +  JSON.stringify(USERNAME) + "" )
            .then(res => res.json())
            .then(
              (result) => {
                console.log("RESPONSE FROM SERVER : " + result);
                this.setState({
                  response: result,
                  success: true
                });
                console.log("login.loginFetch -> CONNECTTED TO SERVER");
                this.connectedToServer(true);
              },
              (error) => {
                this.setState({
                  isLogin: false,
                  success: false,
                  error
                });
                this.connectedToServer(false)
                console.log("FAILED TO CONNECT TO SERVER");
              }
            )
          }

  connectedToServer(didConnect){      
    
    if(didConnect){
        // CONNECTED TO SERVER
        console.log(this.state.response.data)
        this.state.data = this.state.response;
        console.log(this.state.data);
  }else{

        //DO SOMETHING HERE IF DIDNT CONNECT TO SERVER
  }
  
    


}
componentDidMount(){
    console.log(this.props.username)
    this.cartFetch({username:this.props.username});
}
    handleClick = (values) =>{
        this.setState(
            {
                checkout: true,
            }
        );
    }
    render() {
      
        if(!this.state.checkout){

            return (
            <div>
                <Divider orientation="left"> Cart </Divider>
                <Table dataSource={this.data} columns={this.col} />
                <Button onClick={this.handleClick} type="primary">Checkout</Button>
                <h5>TOTAL : $6,250.00</h5>
            </div>
            );
        }else{
            return(
                <Redirect to="/Checkout"/>
            );
        }
    }
}
export default Cart;