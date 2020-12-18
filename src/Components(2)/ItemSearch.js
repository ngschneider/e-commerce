import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link,Redirect} from 'react-router-dom';
import { Input } from 'antd';
import Home from "./Home"


class ItemSearch extends React.Component {
didSearch = 0;
state =
    {
        didSearch: false,
    }

onSearch = (value) =>{
    this.setState(
        {
            didSearch: true,
        }
    );
    
    
}
    render(){
        const { Search } = Input;
        console.log(this.state.didSearch);
        if(!this.state.didSearch){
            return (
                <div>
                    <Search placeholder="Item Search" enterButton="Search" size="large" onSearch={this.onSearch} />
                </div>
            );
        }else{
            
            return (
                <div>
                    <Search placeholder="Item Search" enterButton="Search" size="large" onSearch={this.onSearch} />
                    <Redirect to="/Home"/>
                </div>
            );
        }
    }
}
export default ItemSearch;