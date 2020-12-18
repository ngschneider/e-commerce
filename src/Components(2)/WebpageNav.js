import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Login from './Login.js';
import Item from './Item.js';
class WebpageNav extends React.Component {
    constructor(props){
        super(props
    )
    }
    handleClick = e => {
        this.props.parentCallBackFunction(e.key);
        
        console.log('click ', e);
            this.setState({
              current: e.key,
            });
            
        };

    render(){
        const menu1 = (
            <Menu onClick={this.handleClick} theme="dark" defaultSelectedKeys={['2']}>
                <Menu.Item key= "orders"><Link to="/PreviousOrders" > Previous Orders </Link></Menu.Item>
                <Menu.Item key= "settings"><Link to="/AccountSettings" > Account Settings </Link></Menu.Item>
                <Menu.Item key= "Login"> <Link to="/Login" > Log In </Link></Menu.Item>
                <Menu.Item key= "signup"><Link to="/Signup" > Sign Up </Link></Menu.Item>
            </Menu>
        );
        
            let { SubMenu } = Menu;
            let { Header, Content, Sider } = Layout;
        return (        
        <Header className="header">
        
            <Menu onClick={this.handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {//<Menu.Item key="TEST" ><Link to="/ITEMTEST" > ITEM [TEST] </Link></Menu.Item>
            }
                <Menu.Item key="Home" > <Link to="/Home"> Home </Link> </Menu.Item>
                <Menu.Item key="Sell"><Link to="/Sell" >Sell </Link></Menu.Item>
                <Menu.Item key="Cart"> <Link to="/Cart"> Cart </Link> </Menu.Item>
               
                 <Dropdown  key="asf"overlay={menu1}>
                    <a className="ant-dropdown-link" > Login <DownOutlined />  </a>
                </Dropdown> 
                

                
            </Menu>
        </Header>

         


        );

}


}
export default WebpageNav;