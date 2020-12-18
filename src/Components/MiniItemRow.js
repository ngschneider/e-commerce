import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import s4 from './images/Tshirt4.jpg';
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
        console.log(this.props.items)
        let renderItems = this.props.items.map((obj,i) => {
            console.log(obj.name + " " + obj.uniqueid)
           return ( 
           <Col span={6}>
                     <MiniItem key={obj.uniqueid} pic={obj.pic} uniqueid={obj.uniqueid} name={obj.name}/>
            </Col      >
           )
        });
        return (
            <Row  gutter={[10, 10]}>
               {renderItems}
            </Row>
        );
    }
}
export default MiniItemRow;