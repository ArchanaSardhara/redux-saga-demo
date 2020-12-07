import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Navbar from './components/navbar';
import Users from './components/user';
import NotFound from "./components/notfound";
import AddUser from './components/add-user';
const Routing = (props) => (
  <div>
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/home" component={Users} />
          <Route path="/users" component={Users} />
          <Route path="/add-user" component={AddUser} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    {/* <footer className='border'><center>footer</center></footer> */}
  </div>
)

export default Routing;