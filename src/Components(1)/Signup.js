import React from "react";
import { Form, Input, InputNumber, Divider, Button } from "antd";

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

        }
    }

    loginFetch(SIGNUP_INFOMATION){
        let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
        let serverRoute="/search:";
        fetch( mysqlServer + serverRoute + SIGNUP_INFOMATION )
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            
            console.log("CONNECTTED TO SERVER");
      
            return true;
          },
          (error) => {
           
            console.log("FAILED TO CONNECT TO SERVER");
            return false;
          }
        )
      }
    onFinish = (values) => {

        //console.log("Values recieved from Signup.form \n"  + values.Name + "\n" + values.Email );

        let SIGNUP_INFOMATION = {
            name: values.Name,
            email: values.Email,
            username: values.username,
            password: values.password,
            address: values.address,
        }

        this.loginFetch(SIGNUP_INFOMATION);

    }
    onFinishFailed = (errorInfo) => {

        console.log('Login.js -> Form error: ', errorInfo);

    }
    render() {
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
  }
}
export default Signup;
