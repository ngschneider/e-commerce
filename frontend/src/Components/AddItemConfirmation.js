import React, { useState } from "react";
import { Button, Select } from "antd";
import { Typography, Row, Col } from "antd";
import { Carousel, Form } from "antd";
import "./CSS_FILES/Item.css";
import s1 from "./images/Tshirt1.png";
import s2 from "./images/Tshirt2.jpg";
import s3 from "./images/Tshirt3.png";
import s4 from "./images/Tshirt4.jpg";
import Item from "./Item.js";
import { Space } from "antd";
import FormItem from "antd/lib/form/FormItem";

//This page will fill from AddItem.js

class AddItemConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      message: "",
    };
  }
  state = {
    username: "jjen",
    itemName: "Television",
    price: "500.00",
    //Images: [{pic:telePic1.png, pic:telePic2.png, pic:telePic3.jpg}],
    //miniDescription: [{listItem:70 inch tv, listItem:4k resolution, listItem:Smart TV}],
    description: "THIS IS A VERY LONG DESCRIPTION",
    //			specialDisplay: [{inputType:number, name:Quantity, Rangelow:0, RangeHigh:10},
    //{inputType: textbox, name:Size, Sizes: [{XS, S, M, L, XL}]}]
  };
  addItemConfirmationFetch(ADD_ITEM_ORDER) {
    let mysqlServer =
      "http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
    let serverRoute = "/Add:";
    console.log(ADD_ITEM_ORDER);
    fetch(mysqlServer + serverRoute + "" + JSON.stringify(ADD_ITEM_ORDER) + "")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Reponce -> " + result);
          this.setState({
            responce: result,
          });
          this.connectedToServer(true);
          console.log("CONNECTTED TO SERVER");
        },
        (error) => {
          this.connectedToServer(false);
          console.log("FAILED TO CONNECT TO SERVER");
        }
      );
  }

  connectedToServer(didConnect) {
    if (didConnect) {
      if (this.state) {
        // Login Route responded sucessfully

        console.log("SUCESSFULLY CHANGED PASSWORD");
        this.setState({
          message: "Sucessfully changed password!",
        });
      } else if (!this.state.response) {
        console.log("FAILED TO CHANGE PASSWORD");
        this.setState({
          message: "Failed to change password :(",
        });
      }
    } else {
      //DO SOMETHING HERE IF DIDNT CONNECT TO SERVER
    }
  }
  onFinish = (values) => {
    console.log(values);
    console.log(this.props.location.state.price);

    this.addItemConfirmationFetch({
      itemName: this.props.location.state.name,
      price: this.props.location.state.price,
      images: this.props.location.state.name + ".jpg",
      miniDescription: this.props.location.state.miniDescription,
      description: this.props.location.state.description,
      Quantity: "1",
      username: this.props.username
    });
  };
  render() {

    return (
      <div>
        <Form onFinish={this.onFinish}>
          <Item
           name={this.props.location.state.name} 
           price={this.props.location.state.price} 
           description={this.props.location.state.description} 
           miniDescription={this.props.location.state.miniDescription}/>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
          <Form.Item>
            <Button danger>Cancel</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default AddItemConfirmation;
