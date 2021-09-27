import React, { Component, useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Navbar from '../views/Navbar'
import Registrarse from '../views/Registrarse'
import Login from '../views/Login'
import ChatApp from '../views/ChatApp/ChatApp'
import Acerca from '../views/Acerca/Acerca'

function Router(props) {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height:'100vh'}}>
        <Navbar usuario={props.usuario}/>
        <div className="flex-grow-1">
          <Switch>
            <Route exact path='/' render={() => {
              return props.usuario.id ? <ChatApp usuario={props.usuario}></ChatApp> : <Redirect to="/login"></Redirect>
            }} />
            <Route exact path='/registrarse' component={Registrarse} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/acerca' component={Acerca} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
