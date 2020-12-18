import React from "react";
import MiniItemRow from "./MiniItemRow.js";
import MiniItem from "./MiniItem.js";
import "./CSS_FILES/MiniItem.css";
import { Row, Col, Divider } from "antd";
import { Button } from "antd";
import { Pagination } from "antd";



const style = { background: "#0092ff", padding: "8px 0" };

class PreviousOrders extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        connected:false,
        response:null
    }
}

previousOrderFetch(PREVIOUS_ORDER){
    let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
    let serverRoute="/PreviousOrders:";
    //console.log(PREVIOUS_ORDER)
    fetch( mysqlServer + serverRoute + "" +JSON.stringify(PREVIOUS_ORDER) + "" )
    .then(res => res.json())
    .then(
      (result) => {
       let stringJSON = "{\"data\": " + JSON.stringify(result) +  "}"
       console.log(stringJSON);
       stringJSON = JSON.parse(stringJSON)

       //console.log(stringJSON)
       //let resultJSON = JSON.parse(stringJSON)
          //console.log("Reponse -> " + JSON.parse(stringJSON))
          
        this.setState({
            response:stringJSON,
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
        console.log("PeviousOrder.data ->" + Object.keys(this.state.response))
        if(this.state.response){
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
onChange(pageNumber) {
  console.log("Page: ", pageNumber);
}
componentDidMount(){
  this.previousOrderFetch({username:this.props.username});
}
  render() {
    return (
      <div>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal" }}>
          Previous Orders
        </Divider>
        <MiniItemRow items={[{}]} />
        <Pagination defaultCurrent={1} total={200} onChange={this.onChange} />
      </div>
    );
  }
}
export default PreviousOrders;
