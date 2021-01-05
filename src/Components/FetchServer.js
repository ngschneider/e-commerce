/*
* Connect to web server
*/
class FetchServer {
    constructor(){}
    response = {
        connected:false,
        result:null,
        error: null
   }
    fetchRouteServer(ROUTE,DATA_SEND,callback){
    // DATA_SEND SHOULD BE JSON
      let mysqlServer="http://35.224.238.169:444";
    fetch( mysqlServer + ROUTE + "" +  JSON.stringify(DATA_SEND) + "" )
    .then(res => res.json())
    .then(
      (serverResponse) => {

        console.log("===== Connected to " + ROUTE + "=====");
        console.log("Data Sent : " + JSON.stringify(DATA_SEND) )
        console.log("Data Received : " + JSON.stringify(serverResponse) )
        console.log("=====================================")
       this.updateResponse(true,serverResponse);
       callback(serverResponse,true);

      },
      (error) => {

        //this.connectedToServer(false)
        console.log("===== Failed to connected to server =====");
        console.log("Error received : " + error);
        console.log("===============================")
        this.updateResponse(false,error);
        callback(error,false);
    }
    )
   
  }

   updateResponse(connected,response){
       console.log(this.response.connected)
        this.response.connected = connected;    
        this.response.result = response;
        console.log(this.response.connected)

     

  }
}
export default FetchServer;