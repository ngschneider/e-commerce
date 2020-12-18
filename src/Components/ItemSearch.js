import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link,Redirect} from 'react-router-dom';
import { Input } from 'antd';
import Home from "./Home"


class ItemSearch extends React.Component {
    constructor(props){
        super(props)
    }
didSearch = 0;
state =
    {
        didSearch: false,
    }

onSearch = (value) =>{
    console.log("Searched : " + value)
    this.setState(
        {
            didSearch: true,
            searched: value
        }
    );
    
    
}
    render(){
        const { Search } = Input;
        if(!this.state.didSearch){
            return (
                <div>
                    <Search placeholder="Item Search" enterButton="Search" size="large" onSearch={this.onSearch} />
                </div>
            );
        }else{
            let routePath = "/Home/" + this.state.searched + "/" + this.props.username
            return (
                <div>
                    <Search placeholder="Item Search" enterButton="Search" size="large" onSearch={this.onSearch} />
                    <Redirect to={routePath}/>
                </div>
            );
        }
    }
}
export default ItemSearch;