import React from 'react';
import {Button,Select} from 'antd';
import { Typography, Row, Col } from 'antd';
import { Carousel } from 'antd';
import './CSS_FILES/Item.css';
import s1 from './images/Tshirt1.png';
import s2 from './images/Tshirt2.jpg';
import s3 from './images/Tshirt3.png';
import s4 from './images/Tshirt4.jpg';

const { Paragraph } = Typography;

class Item extends React.Component{
  constructor(props){
        super(props);
        
    }
    cartFetch(ADD_ITEM_CART){
        //console.log(LOGIN_INFORMATION);
       // console.log(JSON.stringify(LOGIN_INFORMATION));
        let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
        let serverRoute="/AddCart:";
        fetch( mysqlServer + serverRoute + "" +  JSON.stringify(ADD_ITEM_CART) + "" )
        .then(res => res.json())
        .then(
          (result) => {
            console.log("RESPONSE FROM SERVER : " + result.credentials);
           
            console.log("ITEM.ADD_TO_CART -> CONNECTTED TO SERVER");
            this.connectedToServer(true);
          },
          (error) => {
            
            this.connectedToServer(false)
            console.log("FAILED TO CONNECT TO SERVER");
          }
        )
      }
      itemFetch(getItem){
        //console.log(LOGIN_INFORMATION);
       // console.log(JSON.stringify(LOGIN_INFORMATION));
        let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
        let serverRoute="/Item:";
        fetch( mysqlServer + serverRoute + "" +  JSON.stringify(getItem) + "" )
        .then(res => res.json())
        .then(
          (result) => {
            console.log("RESPONSE FROM SERVER : " + result);
            console.log("ITEM.ADD_TO_CART -> CONNECTTED TO SERVER");
            this.connectedToServer(true);
          },
          (error) => {
            
            this.connectedToServer(false)
            console.log("FAILED TO CONNECT TO SERVER");
          }
        )
      }


connectedToServer(didConnect){      

if(didConnect){
    // CONNECTED TO SERVER
    this.state.data = this.state.response.data;
  
}else{

    //DO SOMETHING HERE IF DIDNT CONNECT TO SERVER
}


}
//componentDidMount(){
  //  this.itemFetch({uniqueid:this.props.location.state.uniqueid});
//}
handleChange(value) {
       this.cartFetch({username:this.props.username,uniqueid:this.props.uniqueid});
      }
  render() {
    const { Option } = Select;
//console.log(this.props.location.state.uniqueid)
    return (
      <div>
        {
            // put image pic from DB
        }
        <Row gutter={[10,10]}>
            <Col span = {12} value = {10}>
        <Carousel vertical autoplay >
            <div>
                <center><img src={s1} alt="test" height = "300px" width = "300px"/></center>
            </div>
            <div>
                <center><img src ={s2}  alt="test" height = "300px" width = "300px"/></center>
            </div>
            <div>
                <center><img src ={s3}  alt="test" height = "300px" width = "300px"/></center>
            </div>
            <div>
                <center><img src ={s4} alt="test" height = "300px" width = "300px"/></center>
            </div>
        </Carousel>
  </Col>
  <Col span = {12}>
  <p style={{fontSize:32}}>
        
            {this.props.name}<br/>
            {this.props.price}

  </p>
  {"Quantity "}<Select defaultValue="1" style={{ width: 75 }} onChange={this.handleChange}>
    <Option value="1">1</Option>
    <Option value="2">2</Option>
    <Option value="3">3</Option>
    <Option value="4">4</Option>
    <Option value="5">5</Option>
    <Option value="6">6</Option>
    <Option value="7">7</Option>
    <Option value="8">8</Option>
    <Option value="9">9</Option> 
    <Option value="10">10</Option>
    </Select> <p></p>
    {"Size "}<Select defaultValue="M" style={{ width: 75 }} onChange={this.handleChange}>
    <Option value="XS">XS</Option>
    <Option value="S">S</Option>
    <Option value="M">M</Option>
    <Option value="L">L</Option>
    <Option value="XL">XL</Option>
    </Select> <p></p>
    
        <Button type="dashed" onClick={this.handleChange}>Add to Cart</Button>
        <Paragraph > {this.props.miniDescription}
</Paragraph>
      </Col>
      </Row>
      {this.props.description}
      </div>

    );
  }
}
export default Item;    