import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Divider} from 'antd';
import {Redirect} from "react-router-dom";
import fetchServer from "./fetchServer";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responcs: null,
      error: null,
      isLogin: false,
      username: "Not-Logged-In",
      success: false,
    };
  }

// ********************************** //
  layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

 tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};
// ********************************** //


printStateValues(){
  console.log("********STATE VALUES FROM:  Login.JS********");
  console.log("* isLogin  == " + this.state.isLogin + "  *" );
  console.log("* username == "  + "  *" );
  console.log("* sucess   == " + this.state.success + "  *" );
  console.log("********************************************");
}

correctCredentials(credentialResponce){
  if(credentialResponce){
    this.setState({
      isLogin: true,
      username: this.state.responce
    })
  }
}

loginFetch(LOGIN_INFORMATION){
  //console.log(LOGIN_INFORMATION);
 // console.log(JSON.stringify(LOGIN_INFORMATION));
  let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
  let serverRoute="/Login:";
  fetch( mysqlServer + serverRoute + "" +  JSON.stringify(LOGIN_INFORMATION) + "" )
  .then(res => res.json())
  .then(
    (result) => {
      console.log("RESPONCE FROM SERVER : " + result.username);
      this.setState({
        response :result.username
      })
      console.log("login.loginFetch -> CONNECTTED TO SERVER");
      this.connectedToServer(result);
    },
    (error) => {
     
      this.connectedToServer(false)
      console.log("FAILED TO CONNECT TO SERVER");
    }
  )
}

  connectedToServer(response){      
    console.log("response   " + response.credentials)
      if(response){

        this.setState({
          responce: response.result,
          success: true
        });
        console.log(response.credentials)
        this.correctCredentials(response.credentials);

        if(this.state.isLogin){ // Login Route responded sucessfully

          console.log("Login was as, username: " + this.state.response);
          

        } else if(!this.state.isLogin) {
          this.setState({
            isLogin: false,
            success: false,
            error:response.error
          });
          console.log("Credentials are wrong!!!!!");
  
        }
    }else{

          //DO SOMETHING HERE IF DIDNT CONNECT TO SERVER
    }
    
      
  

  }

 onFinishFailed = errorInfo => {

  console.log('Login.js -> Form error: ', errorInfo);

};

onFinish = values => {

   let response = this.loginFetch({user: values.username, pass: values.password} );
    //this.connectedToServer(this.state.response.result);

};
  render() {
    //this.printStateValues();

    if(!this.state.isLogin){ 

      return (
        <div>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal" }}>
            Log In
          </Divider>  

        <Form {...this.layout} name="basic" initialValues={{ remember: true, }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!', }, ]} >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[ { required: true, message: 'Please input your password!', }, ]} >
            <Input.Password />
          </Form.Item>
          <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...this.tailLayout}>
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
    } else if(this.state.isLogin){
      let routePath = "/Home" + "/recommended/" + this.state.response;
        return (
          <div>
            <h1>test</h1>
            
          <Redirect to={routePath}/>
          </div>
        );

    }
    return (
      <h1> REPORT THIS IF YOU SEE THIS </h1>
    )
  }
}
export default Login;