import React from "react";
import "./Panel.scss";
import Menu from "../Menu/Menu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewOrder from "../NewOrder/NewOrder";
import Bucket from "../Bucket/Bucket";
import Account from "../Account/Account";
import History from "../History/History";
import DeleteItemFromBucket from "../DeleteItemFromBucket/DeleteItemFromBucket";
import Pay from "../Pay/Pay";
function Panel() {
  return (
    <div className="panel">
      <Router>
        <Switch>          
          <Route exact path="/panel">
            <Menu />
          </Route>
            <Route path="/panel/newOrder">
            <NewOrder />
          </Route>
          <Route path="/panel/bucket">
            <Bucket />
          </Route>
          <Route path="/panel/account">
            <Account />
          </Route>
          <Route path="/panel/history">
            <History />
          </Route>
          <Route path="/panel/deleteItemFromBucket">
            <DeleteItemFromBucket />
          </Route>
          <Route path="/panel/pay">
            <Pay />
          </Route>         
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default Panel;


/*

          <Route path="/panel/newOrder">
            <NewOrder />
          </Route>
          <Route path="/panel/bucket">
            <Bucket />
          </Route>
          <Route path="/panel/account">
            <Account />
          </Route>
          <Route path="/panel/history">
            <History />
          </Route>
          <Route path="/panel/deleteItemFromBucket">
            <DeleteItemFromBucket />
          </Route>
          <Route path="/panel/pay">
            <Pay />
          </Route>

*/