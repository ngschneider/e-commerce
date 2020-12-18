
class fetchServer {
    constructor(){}
    response = {
        connected:false,
        result:null,
        error: null
   }
    fetchRouteServer(ROUTE,DATA_SEND){
    // DATA_SEND SHOULD BE JSON
    let test = true;
      let mysqlServer="http://ec2-3-16-215-130.us-east-2.compute.amazonaws.com:8081";
    fetch( mysqlServer + ROUTE + "" +  JSON.stringify(DATA_SEND) + "" )
    .then(res => res.json())
    .then(
      (serverResponse) => {
        console.log("===== Connected to " + ROUTE + "=====");
        console.log("Data Sent : " + JSON.stringify(DATA_SEND) )
        console.log("Data Received : " + JSON.stringify(serverResponse) )
        console.log("=====================================")
       this.updateResponse(true,serverResponse);
      },
      (error) => {
        this.connectedToServer(false)
        console.log("===== Failed to connected to server =====");
        console.log("Error received : " + error);
        console.log("===============================")
        this.updateResponse(false,error);
    }
    )
    var now = new Date().getTime();
    while(test){};
    console.log(" d " + this.response.connected)
    
   return this.response;
  }
   updateResponse(connected,response){
       console.log(this.response.connected)
        this.response.connected = connected;    
        this.response.result = response;
        console.log(this.response.connected)

     

  }
}
export default fetchServer;