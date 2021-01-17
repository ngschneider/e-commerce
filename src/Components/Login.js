import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Divider} from 'antd';
import {Redirect} from "react-router-dom";
import FetchServer from "./FetchServer";

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      response: null,
      error: null,
      isLogin: false,
      username: "Not-Logged-In",
      success: false,
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
  if(credentialResponse){
    this.setState({
      isLogin: true,
      username: this.state.response.username
    })
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
    console.log("response   " + response.username)
      if(response){
        this.setState({
          response: response,
          success: true
        });
        console.log(this.state.response.username)
        this.correctCredentials(response.signin);

        if(this.state.isLogin){ // Login Route responded sucessfully

          console.log("Login was as, username: " + this.state.username);
          

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
      return this.loginRender();

    } else if(this.state.isLogin){
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