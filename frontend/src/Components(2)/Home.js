import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import MiniItem from './MiniItem.js';
import MiniItemRow from './MiniItemRow.js';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
       let numbers = [[<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>],
       [<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>,<MiniItem/>],

    ]
    
        return (
            <div>
                <MiniItemRow />
                <MiniItemRow />
                <MiniItemRow />
            </div>

        );
    }
}
export default Home;