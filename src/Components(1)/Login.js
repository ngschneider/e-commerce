import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Divider} from 'antd';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      responce: null,
      error: null,
      isLogin: false,
      username: "NOT_LOGGED_IN",
      sucess: undefined,
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
  console.log("* sucess   == " + this.state.sucess + "  *" );
  console.log("********************************************");
}

correctCredentials(credentialResponce){
  if(credentialResponce){
    this.setState({
      isLogin: true
    })
  }
}

loginFetch(LOGIN_INFORMATION){
  let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
  let serverRoute="/login:";
  fetch( mysqlServer + serverRoute + LOGIN_INFORMATION )
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      this.setState({
        responce: result,
        sucess: true,
      });
      console.log("CONNECTTED TO SERVER");

      return true;
    },
    (error) => {
      this.setState({
        isLogin: false,
        sucess: false,
        error
      });
      console.log("FAILED TO CONNECT TO SERVER");
      return false;
    }
  )
}

  connectedToServer(){
    
    this.correctCredentials(this.state.responce.isSucess);

    if(this.state.isLogin){ // Login Route responded sucessfully

      console.log("Login was a sucess, username: " + this.state.username);
    
    } else if(!this.state.login) {

      console.log("Credentials are wrong!!!!!");

    }

  }

 onFinishFailed = errorInfo => {

  console.log('Login.js -> Form error: ', errorInfo);

};

onFinish = values => {

    console.log("Values recieved from login.form \n"  + values.username + "\n" + values.password );

    if(!this.loginFetch({user: values.username, pass: values.password})){
          // DO SOMETHING HERE TELL USER THIS SERVER IS DOWN
    }

    this.connectedToServer()

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
    } else if(this.state.islogin){
      
        return (
          <h1> WELCOME TO THE USER THAT GOES BY {this.state.responce.username} </h1>
        );

    }
    return (
      <h1> REPORT THIS IF YOU SEE THIS </h1>
    )
  }
}
export default Login;