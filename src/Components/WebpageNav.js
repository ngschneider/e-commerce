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
       // this.props.parentCallBackFunction(e.key);
        
        console.log('click ', e);
            this.setState({
              current: e.key,
            });
            
        };

    render(){
        let menu1 = "LOGIN_DROPDOWN_BROKEN";
        let loginText = "Login"
        if(this.props.username == ("Not-Logged-In" || "" || " ") ){
            menu1 = (
                <Menu onClick={this.handleClick} theme="dark" defaultSelectedKeys={['2']}>
                    <Menu.Item key= "Login"> <Link to="/Login" > Log In </Link></Menu.Item>
                    <Menu.Item key= "signup"><Link to="/Signup" > Sign Up </Link></Menu.Item>
                </Menu>
            );
        }else{
            loginText = this.props.username;
            let routePathPreviousOrder = "/PreviousOrders/" + this.props.username;
            let routePathAccountSettings = "/AccountSettings/" + this.props.username;
            menu1 = (
                <Menu onClick={this.handleClick} theme="dark" defaultSelectedKeys={['2']}>
                    <Menu.Item key= "orders"><Link to={routePathPreviousOrder} > Previous Orders </Link></Menu.Item>
                    <Menu.Item key= "settings"><Link to={routePathAccountSettings} > Account Settings </Link></Menu.Item>
                    <Menu.Item key= "Logout"> <Link to="/Home/Recommended/Not-Logged-In" > Logout </Link></Menu.Item>

                </Menu>
            );
        }
        
            let { SubMenu } = Menu;
            let { Header, Content, Sider } = Layout;
            let routePathHome = "/Home/Recommended/" + this.props.username;
            let routePathCart = "/Cart/" + this.props.username;
            let routePathSell = "/Sell/" + this.props.username;

        return (        
        <Header className="header">
        
            <Menu onClick={this.handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {//<Menu.Item key="TEST" ><Link to="/ITEMTEST" > ITEM [TEST] </Link></Menu.Item>
            }
                <Menu.Item key="Home" > <Link to={routePathHome} > Home </Link> </Menu.Item>
                <Menu.Item key="Sell"><Link to={routePathSell} >Sell </Link></Menu.Item>
                <Menu.Item key="Cart"> <Link to={routePathCart}> Cart </Link> </Menu.Item>
               
                 <Dropdown  key="asf"overlay={menu1}>
                    <a className="ant-dropdown-link" > {loginText} <DownOutlined />  </a>
                </Dropdown> 
                

                
            </Menu>
        </Header>

         


        );

}


}
export default WebpageNav;