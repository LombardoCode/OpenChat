import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Conversacion from './Conversacion/Conversacion';
import ListaDeContactos from './ListaDeContactos/ListaDeContactos';

function ChatApp(props) {
  let [contacto, setContacto] = useState({});
  let [conversacion, setConversacion] = useState([]);
  const [escribiendo, setEscribiendo] = useState({});

  useEffect(() => {
    // Conectamos al usuario a su propio canal privado de mensajes
    console.log(props.usuario.id)
    Echo.private('mensajes.' + props.usuario.id)
    .listen('EnviarMensaje', (e) => {
      handleAgregarMensaje(e.mensaje)
    })
    .listenForWhisper('typing', (e) => {
      console.log('Typing');
      console.log(e);
      setEscribiendo(e)
    })
  }, []);

  const cambiarContacto = (contacto_nuevo) => {
    // Cambiamos el contacto
    setContacto(contacto_nuevo);

    // Obtenemos los últimos mensajes con el contacto seleccionado
    axios.get('/api/mensajes/' + contacto_nuevo.id)
    .then(res => {
      setConversacion(res.data.mensajes);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleAgregarMensaje = (mensaje_nuevo) => {
    // Agregamos el nuevo mensaje
    setConversacion((prevState) => [
      ...prevState,
      mensaje_nuevo
    ]);
  }

  return (
    <div className="container">
      <div className="row">
        <Conversacion
          usuario={props.usuario}
          contacto={contacto}
          conversacion={conversacion}
          agregarMensaje={(mensaje_nuevo) => handleAgregarMensaje(mensaje_nuevo)}
          escribiendo={escribiendo}
        ></Conversacion>
        <ListaDeContactos
          setConversacion={(contacto_nuevo) => cambiarContacto(contacto_nuevo)}
        ></ListaDeContactos>
      </div>
    </div>
  );
}

export default ChatApp;
