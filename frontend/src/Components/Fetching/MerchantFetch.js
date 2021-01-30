import FetchServer from "./FetchServer";

export const isMerchant = (DATA,cb) => {
    let route = "/merchant";
    let type = "isMerchant";
    DATA.type = type;
    let fetch = new FetchServer();
    fetch.fetchRouteServer( route, DATA, (response) => {
        cb(response);
    });
}

export const getMerchant = (DATA, cb) => {
    let route = "/merchant";
    let type = "getMerchant";
    DATA.type = type;
    let fetch = new FetchServer();
    fetch.fetchRouteServer(route,DATA, (response) =>    {
        cb(response);
    });

}


//export default isMerchant;