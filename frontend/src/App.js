import React from 'react';
import logo from './logo.svg';
import WebpageContainer from "./Components/WebpageContainer.js";
import './App.css';
import Login from "./Components/Login.js";
import Item from './Components/Item.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <WebpageContainer/>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}


function Catagories() {
  return (
    <div>
      <h2>Catagories</h2>
    </div>
  );
}

function Sell() {
  return (
    <div>
    <Link to="/addItem">addItem</Link>
      <Switch>
        <Route path="/addItem">
          <AddItem />
        </Route>
        </Switch>
    </div>
  );
}
function AddItem() {
  return (
    <div>
      <h2>Adding ITem</h2>
    </div>
  );
}

export default App;
