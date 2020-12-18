import React from "react";
import { Row, Col, Layout } from "antd";
import { Form, Input, InputNumber, Button } from "antd";

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

class AddItem extends React.Component {
  render() {
    return (
      <div>
        <Form {...layout}>
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Form.Item
                name={["user", "name"]}
                label="Item Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "age"]}
                label="Price"
                rules={[{ type: "number", min: 0 }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Form.Item
                name={["user", "introduction"]}
                label="Short Description of Item"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={20}>
              <Form.Item
                name={["user", "introduction"]}
                label="Long Description of Iterm"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default AddItem;
