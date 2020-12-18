import React from "react";
import { Table, Divider, Button } from "antd";
import {Redirect} from 'react-router-dom';

class Cart extends React.Component {
    
    constructor(props){
        super(props);
    }
    state = {
        checkout: false,
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
            title: "SubTotal",
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
        ];

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