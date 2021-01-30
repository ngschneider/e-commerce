import React from "react";
import MiniItemRow from "./MiniItemRow.js";
import MiniItem from "./MiniItem.js";
import "./CSS_FILES/MiniItem.css";
import { Row, Col, Divider } from "antd";
import { Button } from "antd";
import {Redirect} from 'react-router-dom';
import {isMerchant, getMerchant} from "./Fetching/MerchantFetch";

const style = { background: "#0092ff", padding: "8px 0" };

class Sell extends React.Component {

        constructor(props){
            super(props);
            this.state = {
                isMerchant: false, // Is the user a merchant?
                merchantId: -1,
                merchantName: "undefined!",
                merchantItems:-1,
                merchantSold:-1,
                connected:false,   //
                currentItems:[],   // current products in store
                soldItems:[],       // Products sold
                response:null,     // response from server
                additem:false       // User Click addItem
            }
        }
        



        ///
        sellFetch(SELL_ORDER){
            let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
            let serverRoute="/Sell:";
            console.log(SELL_ORDER)
            fetch( mysqlServer + serverRoute +JSON.stringify(SELL_ORDER)  )
            .then(res => res.json())
            .then(
              (result) => {
                  //result = JSON.parse(result)
                this.setState({
                    response:result,
                    currentItems:result.currentItems,
                    soldItems:result.soldItems
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
                console.log(this.state.response)
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

    componentDidMount(){
        console.log("username: " + this.props.username);
        //this.sellFetch({username:this.props.username})

        // Is the current user a merchant?
        let mObj = {
            username:this.props.username
        }

        isMerchant(mObj, (response) => {
            this.setState(
                {
                    isMerchant: response.merchant,
                    merchantId:response.merchantId
                }
            );
            if(response.merchant){
                getMerchant({merchantId:response.merchantId}, (response) => {
                    this.setState(
                        {
                            merchantName: response.merchantUsername,
                            merchantItems: response.currentProductCount,
                            merchantSold: response.totalItemsSold
                        }
                    );
                });
            }
        });

    }

onButtonClick = (values) => {
    this.setState({
        additem:true,
    })
}

  render() {

    if(this.state.isMerchant){

        if(!this.state.additem) {

           return this.merchantView();

        }else{

            let routePath="/AddItem/"+ this.props.username

           return <Redirect to={routePath}/>

        }
        
    }else{

       return this.nonMerchantView();

    }

      
  }

  nonMerchantView(){

    return (<div> <h1> You are not a merchant! Contact the server admin to signup as a merchant! </h1> </div>);
  }

  merchantView(){
    return (
        <>
        <h1> {this.state.merchantName + "'s store"}</h1>
            <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
            >
          {this.state.merchantItems}  Unsold Items
            </Divider>
            <MiniItemRow items={this.state.currentItems}/>
            <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
            >
            {this.state.merchantSold} Sold Items
            </Divider>
            <MiniItemRow items={this.state.soldItems} />
            <Button onClick={this.onButtonClick} type="primary" block>
            Add Item
            </Button>
        </>
        );
  }
  
}

export default Sell;