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

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Enter or Change Card Info For This Purchase
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
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="Address"
            rules={[{ required: true }]}
          >
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
export default Checkout;