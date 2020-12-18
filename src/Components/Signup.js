import React from "react";
import { Form, Input, InputNumber, Divider, Button } from "antd";
import {Redirect} from 'react-router-dom';

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

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signup:false,
            responce:null
        }
    }

    loginFetch(SIGNUP_INFOMATION){
        let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
        let serverRoute="/Signup:";
        console.log(SIGNUP_INFOMATION)
        fetch( mysqlServer + serverRoute + "" +JSON.stringify(SIGNUP_INFOMATION) + "" )
        .then(res => res.json())
        .then(
          (result) => {
              console.log("Reponce -> " + result)
            this.setState({
                responce:result
            });
            this.connectedToServer(true);
            console.log("CONNECTTED TO SERVER");
      
          },
          (error) => {
           this.connectedToServer(false);
            console.log("FAILED TO CONNECT TO SERVER");

          }
        )
      }
    connectedToServer(connected){
        if(connected){
            //CONNECTED TO SERVER
            console.log(this.state.responce)
            if(this.state.responce ){
                this.setState(
                    {
                        signup:true
                    }
                );
            }else{
                // Connected TO SERVER, BUT DID NOT SUCESSFULL SIGNUP
            }
        }else{
            // DID NOT CONNECT TO SERVER
        }
    }
    onFinish = (values) => {

        //console.log("Values recieved from Signup.form \n"  + values.Name + "\n" + values.Email );

        let SIGNUP_INFOMATION = {
            name: values.Name,
            email: values.Email,
            username: values.Username,
            password: values.password,
            address: values.Address,
        }

        this.loginFetch(SIGNUP_INFOMATION);

    }
    onFinishFailed = (errorInfo) => {

        console.log('Login.js -> Form error: ', errorInfo);

    }
    render() {
        if(!this.state.signup) {
            return (
                <div>

                    <Divider orientation="left" style={{ color: "#333", fontWeight: "normal"}} >
                        Sign Up
                    </Divider>

                    <Form {...layout } onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>

                        <Form.Item label="Name" name="Name"rules={[{ reqauired: true }]} >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Email" name="Email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item  label="Username" name="Username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="Password" rules={[ {required: true,message: "Please input your password!",},]}hasFeedback>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="confirm" label="Confirm Password"  dependencies={["password"]}hasFeedback rules={[ { required: true, message: "Please confirm your password!",},
                            ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
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

                        <Form.Item label="Address" name="Address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            );
        }else{
            return (
                <Redirect to="/Login"/>
            )
        }

  }
}
export default Signup;
