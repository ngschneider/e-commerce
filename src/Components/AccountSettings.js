import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { Row, Col, Divider } from "antd";
import FormItem from "antd/lib/form/FormItem";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

class AccountSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      response:null,
      message:""
    }
  }

  accoutSettingsFetch(LOGIN_INFORMATION,ROUTE){
    //console.log(LOGIN_INFORMATION);
   // console.log(JSON.stringify(LOGIN_INFORMATION));
    let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
    let serverRoute=ROUTE;
    fetch( mysqlServer + serverRoute + "" +  JSON.stringify(LOGIN_INFORMATION) + "" )
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          response: result,
          success: true
        });
        console.log("****** accountSettings.Fetch -> CONNECTTED TO SERVER *******");
        this.connectedToServer(true);
      },
      (error) => {
        this.setState({
          isLogin: false,
          success: false,
          error
        });
        this.connectedToServer(false)
        console.log("****** accountSettings.Fetch -> " + " FAILED TO CONNECT TO SERVER *******");
      }
    )
  }
  
    connectedToServer(didConnect){      
      
        if(didConnect){
    
          if(this.state.response.changedPass){ // Login Route responded sucessfully
  
            console.log("SUCESSFULLY CHANGED PASSWORD");
            this.setState(
              {
                message:"Sucessfully changed password!"
              }
            );
            
  
          } else if(!this.state.response.changedPass) {
    
            console.log("FAILED TO CHANGE PASSWORD");
            this.setState(
              {
                message:"Failed to change password :("
              }
            );
    
          }
      }else{
  
            //DO SOMETHING HERE IF DIDNT CONNECT TO SERVER
      }
      
        
    
  
    }
    onFinishPassword = (values) => {
      console.log(values)
      console.log(this.props.username)
      this.accoutSettingsFetch({username:this.props.username,currentPassword:values.currentPassword,newPassword:values.newPassword},"/ChangePassword")
    }

  render() {
    return (
      <div>
          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Change Password
          </Divider>
        <Form {...layout } onFinish={this.onFinish}>
          
        <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm New Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
       <h3> {this.state.message} </h3>
        <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Save Credit Card Info
          </Divider>
        <Form {...layout}>
         
          <Form.Item
            name={["user", "Cname"]}
            label="Cardholder Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "cardNumber"]}
            label="Card Number"
            rules={[{ type: "number", min: 0 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "ExpM"]}
            label="Experation Month"
            rules={[{ type: "number", min: 0, max: 12 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "ExpY"]}
            label="Experation Year"
            rules={[{ type: "number", min: 0, max: 9999 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={["user", "CVV"]}
            label="CVV"
            rules={[{ type: "number", min: 0, max: 999 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        
      </div>
    );
  }
}
export default AccountSettings;