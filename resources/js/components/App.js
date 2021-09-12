import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import Router from './router'

function App(props) {
  const [usuario, setUsuario] = useState(JSON.parse($('#app').attr("usuario")));

  return (
    <Router usuario={usuario}></Router>
  );
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
