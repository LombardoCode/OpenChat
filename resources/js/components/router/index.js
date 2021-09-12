import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from '../views/Navbar'
import Registrarse from '../views/Registrarse'
import Login from '../views/Login'

function Router(props) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height:'100vh'}}>
        <Navbar usuario={props.usuario}/>
        <div className="flex-grow-1">
          <Switch>
            <Route exact path='/registrarse' component={Registrarse} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
