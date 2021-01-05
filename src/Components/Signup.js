import React from "react";
import { Form, Input, InputNumber, Divider, Button } from "antd";
import {Redirect} from 'react-router-dom';
import FetchServer from "./FetchServer"

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
            response:null
        }
    }
    loginFetch(information){
        let getInfo = new FetchServer();
        getInfo.fetchRouteServer("/addUser",information,function(result,connected){
            console.log(`Success! => ${JSON.stringify(result)}`);
            // Broken, Bind state or create promise, or create function for this to be executed
            this.setState({
                response:result
            });
            this.connectedToServer(connected)

        });

    }
    
    connectedToServer(connected){
        if(connected){
            //CONNECTED TO SERVER
            console.log(this.state.response.signup)
            if(this.state.response.signup == "true"){
                console.log("Account Successfully Created");
                this.setState(
                    {
                        signup:true
                    }
                );
            }else{
                // Connected TO SERVER, BUT DID NOT SUCESSFULL SIGNUP
                console.log("Signup Unsuccessful, Email or username is currently in use.");
            }
        }else{
            // DID NOT CONNECT TO SERVER
            console.log("Failed to connect to server");

        }
    }

    onFinish = (values) => {

        //console.log("Values recieved from Signup.form \n"  + values.Name + "\n" + values.Email );

        let SIGNUP_INFOMATION = {
            firstname: values.Name,
            lastname: values.Name,
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

    // Clean up render method, by making function for different render paths.
    render() {
        if(!this.state.signup) {
            return this.signupRender();
        }else{
            return (
                <Redirect to="/Login"/>
            )
        }

  }
  
  signupRender() {
    return (
        <div>

            <Divider orientation="left" style={{ color: "#333", fontWeight: "normal"}} >
                Sign Up
            </Divider>

            <Form {...layout } onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>

                <Form.Item label="Name" name="Name"rules={[{ required: true }]} >
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
                                    "The passwords that you entered do not match!"
                                );
                        },
                    }),
                ]}>
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


  }
}
export default Signup;
