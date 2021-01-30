import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Divider} from 'antd';
import {Redirect} from "react-router-dom";
import FetchServer from "./Fetching/FetchServer";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responseReceived: null, // Response from the server.
      errorReceived: null,    // Error Response from the server.
      loginSucessfull: false, // Login has sucessfully signed in ?
      username: "Not-Logged-In",
      fetchedServer: false, // Response from receviced ? 
    };
  }

// **************Layout******************** //
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

correctCredentials(credentialResponse){


  if(credentialResponse === "true"){
    console.log("asdfasdfasdf" + credentialResponse);

    this.setState({
      loginSucessfull: true,
      username: this.state.responseReceived.username
    })
  }else{
    console.log("asdfasdfasdf" + credentialResponse);

    this.setState({
      
      loginSucessfull: false,
      username: this.state.responseReceived.username
    });
  }
}

loginFetch = (LOGIN_INFORMATION) => {
  let getInfo = new FetchServer();
  let route = "/Login";
  getInfo.fetchRouteServer(route,LOGIN_INFORMATION,(results,connected) => {
    console.log(results)
    this.connectedToServer(results)
  });

}


  connectedToServer(response){      
    // console.log("response   " + response.username)
      if(response){
        this.setState({
          responseReceived: response,
          fetchedServer: true
        });

        console.log(this.state.responseReceived.username)
        console.log(response.signin);

        this.correctCredentials(response.signin);

        console.log(this.state.loginSucessfull);

        if(this.state.loginSucessfull){ // Login Route responded sucessfully

          console.log("Login as, username: " + this.state.username);
          

        } else if(!this.state.loginSucessfull) {

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

    if(!this.state.loginSucessfull){ 
      return this.loginRender();

    } else if(this.state.loginSucessfull){
      return this.rerouteLogin();
    }
    return (
      <h1> REPORT THIS IF YOU SEE THIS </h1>
    )
  }

  loginRender(){
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
  }
  rerouteLogin(){
    let routePath = "/Home" + "/recommended/" + this.state.username;
    return (
      <div>
        <h1>test</h1>
        <Redirect to={routePath}/>
      </div>
    );
  }
}
export default Login;