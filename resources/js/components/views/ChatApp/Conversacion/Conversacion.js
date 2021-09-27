import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Mensaje from '../Mensaje/Mensaje';

function Conversacion({ usuario, contacto, conversacion, agregarMensaje, escribiendo }) {
  const [mensaje, setMensaje] = useState('');
  const [token, setToken] = useState(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

  function handleEscribiendo(e) {
    let mensaje = e.target.value;
    setMensaje(mensaje)

    // Identificamos si el usuario está escribiendo un mensaje para mandarlo mediante websockets
    if (mensaje.length > 0) {
      Echo.private('mensajes.' + contacto.id)
      .whisper('typing', {
        nombre: usuario.name,
        escribiendo: true,
        mensaje
      })
    } else {
      Echo.private('mensajes.' + contacto.id)
      .whisper('typing', {
        nombre: null,
        escribiendo: false,
        mensaje
      })
    }
  }

  function enviarMensaje(e) {
    e.preventDefault();

    axios.post('/api/mensajes', {
      contacto: contacto,
      mensaje: mensaje
    })
    .then(res => {
      if (res.data.success) {
        // Agregamos el mensaje a la conversación
        agregarMensaje(res.data.mensaje);

        // Limpiamos el input del mensaje y dejamos de alertar al otro usuario que no estamos escribiendo un mensaje
        setMensaje('');

        Echo.private('mensajes.' + contacto.id)
        .whisper('typing', {
          nombre: null,
          escribiendo: false,
          mensaje
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="col-9 bg-success px-0">
      <div className="d-flex flex-column h-100">
        <div id="header" className="w-full bg-primary px-3 py-2 text-white">
          {contacto.id
          ? (
            <React.Fragment>
              <p className="mb-0">{contacto.name}</p>
              <p className="mb-0">{contacto.email}</p>
            </React.Fragment>
          )
          : (
            <p className="mb-0">Selecciona un contacto</p>
          )}
        </div>
        <div id="conversacion">
          {Object.keys(conversacion).map(function(key) {
              return (
                <Mensaje mensaje={conversacion[key]} key={conversacion[key].id} usuario={contacto}></Mensaje>
              )
          })}
        </div>
        {contacto.id
          ? (
            <div className="mt-auto">
              {escribiendo.escribiendo
              ? (
                <p className="m-0">{escribiendo.nombre} está escribiendo...</p>
              )
              : (null)}
              <form className="d-flex w-full px-2 pb-1" onSubmit={enviarMensaje}>
                <input type="hidden" name="_token" value={token}></input>
                <input type="text" className="form-control mr-1" placeholder="Ingrese su mensaje" value={mensaje} onChange={(e) => handleEscribiendo(e)} />
                <input type="submit" className="btn btn-primary" value="Enviar" />
              </form>
            </div>
          )
          : (null)}
      </div>
    </div>
  );
}

export default Conversacion;
