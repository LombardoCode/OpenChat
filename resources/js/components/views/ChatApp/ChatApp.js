import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Conversacion from './Conversacion/Conversacion';
import ListaDeContactos from './ListaDeContactos/ListaDeContactos';

function ChatApp(props) {
  let [contacto, setContacto] = useState({});

  return (
    <div className="container">
      <div className="row">
        <Conversacion usuario={props.usuario} contacto={contacto}></Conversacion>
        <ListaDeContactos setConversacion={(contacto) => setContacto(contacto)}></ListaDeContactos>
      </div>
    </div>
  );
}

export default ChatApp;
