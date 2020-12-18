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
  /*  Constructor(String){
        super();
    }*/

    handleChange(value) {
        console.log(`selected ${value}`);
      }
  render() {
    const { Option } = Select;

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
        
            {"T-Shirt Bundle "}

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
    
        <Button type="dashed" onClick="">Add to Cart</Button>
        <Paragraph > <ul><li>100% Cotton Sport Grey And Antique Heather</li>
<li>Pull On closure</li>
<li>Machine Wash</li>
<li>Seamless double needle collar</li>
<li>Taped neck and shoulders for durability</li>
<li>Double needle sleeve and bottom hem</li>
<li>Tubular fit for minimal torque</li></ul>
</Paragraph>
      </Col>
      </Row>
      </div>

    );
  }
}
export default Item;    