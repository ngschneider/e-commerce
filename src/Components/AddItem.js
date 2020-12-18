import React from "react";
import { Row, Col, Layout ,Divider} from "antd";
import { Form, Input, InputNumber, Button,Select } from "antd";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./CSS_FILES/AddItem.css";
//mport 'console.image';
import { number } from "prop-types";
import {Redirect} from 'react-router-dom';
//  import { Divider } from "rc-menu";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const { Option } = Select;

class AddItem extends React.Component {
  img = [];
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    responce:null,
    imageList:[],
    connected:false,
    optionalInputsStr:[],
    optionalInputsNum:[],
    price:"",
    description: "",
    miniDescription:"",
    name:""

  };
  getBase64 = (file) =>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  addItemFetch(ADD_ITEM_ORDER){
    let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
    let serverRoute="/AddItem:";
    console.log(ADD_ITEM_ORDER)
    fetch( mysqlServer + serverRoute + "" +JSON.stringify(ADD_ITEM_ORDER) + "" )
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
                    connected:true
                }
            );
        }else{
            // Connected TO SERVER, BUT DID NOT SUCESSFULL SIGNUP
        }
    }else{
        // DID NOT CONNECT TO SERVER
    }
}
  handleCancel = () => this.setState({ previewVisible: false });

  normFile = e => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  
  

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  print(){
    console.log("IMAGE :")
    console.log(this.state.fileList[0])
    console.log("IMAGE1 :")

    console.log(this.state.fileList[1].response.url)
    console.log("IMAGE2 :")

    console.log(this.getBase64(this.state.fileList[0].originFileObj));

  }
  reader = new FileReader();

  handleChange = ( info ) => {
    console.log("filelist keys " + Object.keys(info["fileList"]))
    let fileList = info["fileList"].map(file => {
      if (file.response) {
        //console.log(file)
        // Component will show file.url as link
        file.url = file.response.url;

     //   this.reader.readAsDataURL(file)
       // this.reader.onload = () => {
         // this.reader.result;
        //}
      //this.reader.onerror = (error) => (console.log(error));
        //console.image(file.thumbUrl)
        console.log(file.url);
      }
      return file;
    });

    this.setState({ fileList });
      console.log("handleChange" + (fileList[0].url))
  };
  handleChangeSelect = (values) => {
    console.log(values)
  };
  onFinishFailed = () => {}
  onFinish = (values) =>{
    console.log("Item ->" + values.user.price)
    this.setState({    
      price: values.user.price,
      description: values.user.description,
      miniDescription:values.user.shortDescription,
      name:values.user.name
    });
    console.log(values)
    console.log(values.user.name)
    console.log(values.user.age)
   // this.addItemFetch({username:values.user.name});
   this.print();
  }
  onFinishInputStr = (values) =>{
    let temp = this.state.optionalInputsStr
    temp.push(values);
    this.setState({
      optionalInputsStr:temp
    });
  }
  onFinishInputNum = (values) =>{
    let temp = this.state.optionalInputsNum
    temp.push(values);
    this.setState({
      optionalInputsNum:temp
    });
  }
  onButtonClick = (values) => {
    console.log("asdf" + values);
    this.setState({
        confirmPage:true,
    })
}

  render() {
    
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    this.img.push(previewImage)
    console.log(Object.keys((fileList)));

    //console.image(previewImage)
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload picture</div>
      </div>
    );
let numberInput = (
    <Col span={12}>
      <Divider>Number Input</Divider>
      <Form onFinish={this.onFinishInputNum} onFinishFailed={this.onFinishFailedInputNum}>
       <Form.Item name={"numLabel"} label={"Name of input"}> 
                <Input />
      </Form.Item>
       <Form.Item name={"min"} label={"min"} rules={[]}> 
                <InputNumber />
      </Form.Item>
      <Form.Item name={"max"} label={"max"} rules={[]}> 
                <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Add Item
                </Button>
      </Form.Item>
    </Form>

    </Col>
  );

  let stringInput = (
    <Col span={12}>
      <Divider>String input</Divider>
      <Form onFinish={this.onFinishInputStr} onFinishFailed={this.onFinishFailedInputStr}>
       <Form.Item name={"strLabel"} label={"Name of input"}> 
                <Input />
      </Form.Item>
       <Form.Item name={"options"} label={"String input seperated by comma"} rules={[]}> 
                <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Add Item
                </Button>
      </Form.Item>
    </Form>

    </Col>
  );
  let optionalsNum = this.state.optionalInputsNum.map((obj,i)=> {

    return (
     
     <li>{"Optional Number " + (i + 1)} <ul> <li> {"Name : " + obj.numLabe}</li><li> { "max: " + obj.max} </li><li>{" min : " + obj.min}</li></ul></li>

    );
  });
  let optionalsStr = this.state.optionalInputsStr.map((obj,i)=> {

    return (
     
     <li>{"Optional String " + (i + 1)} <ul> <li>{"Name : " + obj.strLabel}</li><li>{"options: " + obj.options}</li></ul></li>

    );
  });
  if(this.state.confirmPage){
    return <Redirect to={{pathname:"/AddItem/Confirmation/username",
                          state:{
                            
                              price:this.state.price,
                              name:this.state.name,
                              description:this.state.description,
                              miniDescription:this.state.miniDescription,
                          }
  }}/>
  }else {
    return (

      <div>
        <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <Divider orientation="left">Add an item to your Store, {this.props.username}</Divider>

          <Row>
            <Col span={12}>
            <Divider>Upload Images</Divider>
            <Form.Item
                name={"images"}
                label="Item Name"
                rules={[{ required: true }]}
              >
              <div className="clearfix">
                <Upload 
                  action="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081/AddPic:"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  getValueFromEvent={this.normFile}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />

                </Modal>
          
              </div>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Divider>Item information</Divider>

              <Form.Item
                name={["user", "name"]}
                label="Item Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "price"]}
                label="Price"
                rules={[{ required: true, type: "number", min: 0 }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>


          <Row>
          <Divider>Description</Divider>

            <Col span={20}>
              <Form.Item
                name={["user", "shortDescription"]}
                label="Short Description of Item"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={20}>
              <Form.Item
                name={["user", "description"]}
                label="Long Description of Iterm"
                rules={[{ required: true }]}

              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Divider>Optional input boxes</Divider>
            {stringInput }
            {numberInput}
          </Row>
          <Row>
            <Col span={12}>
              <ul>
              {optionalsStr}

                </ul>
              </Col>
              <Col span={12}>

                <ul>
                {optionalsNum}
                </ul>
            </Col>

           </Row> 
          <Button onClick={this.onButtonClick} type="primary" block>
          ADD CONFIRMATION PAGE
        </Button>
      </div>
     
    );
  }
  }
}
export default AddItem;
