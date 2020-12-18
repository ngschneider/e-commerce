import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import s4 from './images/Tshirt4.jpg';
import './CSS_FILES/MiniItem.css';
import MiniItem from './MiniItem.js';

class MiniItemRow extends React.Component{
//constructor for arrray of product,picture
constructor(props){
        super(props);
    }
    render(){
        const divStyle = {
            backgroundColor: '#CDCDCD',
            margin: '10',
            padding: '10'
        }
        return (
            <Row  gutter={[10, 10]}>
                <Col span={6}>
               
                     <MiniItem name={"test1"}/>
                     </Col>

                <Col span={6}>
                
                     <MiniItem name={"test2"}/>
              
                </Col>

                <Col span={6}>
                
                <MiniItem name={"test3"}/>
         
           </Col>
                <Col span={6}>
                
                <MiniItem name={"test4"}/>
         
           </Col>           
            </Row>
        );
    }
}
export default MiniItemRow;