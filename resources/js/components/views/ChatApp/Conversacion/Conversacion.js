import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Mensaje from '../Mensaje/Mensaje';

function Conversacion(props) {
  const [conversacion, setConversacion] = useState([]);
  const [mensaje, setMensaje] = useState('');
  let [token, setToken] = useState(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

  useEffect(() => {
    if (props.contacto.id ) {
      setConversacion([]);

      axios.get('/api/mensajes/' + props.contacto.id)
      .then(res => {
        console.log(res.data.mensajes);
        setConversacion(res.data.mensajes);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [props.contacto]);

  function enviarMensaje(e) {
    e.preventDefault();

    axios.post('/api/mensajes', {
      contacto: props.contacto,
      mensaje: mensaje
    })
    .then(res => {
      console.log(res.data);
      if (res.data.success) {
        setConversacion([...conversacion, res.data.mensaje]);
        console.log(conversacion)
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
          {props.contacto.id
          ? (
            <React.Fragment>
              <p className="mb-0">{props.contacto.name}</p>
              <p className="mb-0">{props.contacto.email}</p>
            </React.Fragment>
          )
          : (
            <p className="mb-0">Selecciona un contacto</p>
          )}
        </div>
        <div id="conversacion">
          {Object.keys(conversacion).map(function(key) {
              return (
                <Mensaje mensaje={conversacion[key]} key={conversacion[key].id} usuario={props.contacto}></Mensaje>
              )
          })}
        </div>
        <form className="d-flex mt-auto w-full px-2 pb-1" onSubmit={enviarMensaje}>
          <input type="hidden" name="_token" value={token}></input>
          <input type="text" className="form-control mr-1" placeholder="Ingrese su mensaje" onChange={(e) => setMensaje(e.target.value)} />
          <input type="submit" className="btn btn-primary" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default Conversacion;
