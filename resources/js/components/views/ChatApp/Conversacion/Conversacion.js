import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Mensaje from '../Mensaje/Mensaje';

function Conversacion(props) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    if (props.contacto.id ) {
      setMensajes([]);

      axios.get('/api/mensajes/' + props.contacto.id)
      .then(res => {
        console.log(res.data.mensajes);
        setMensajes(res.data.mensajes);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [props.contacto]);

  return (
    <div className="col-9 bg-success px-0">
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
      <div id="mensajes">
        {Object.keys(mensajes).map(function(key) {
            return (
              <Mensaje mensaje={mensajes[key]} key={mensajes[key].id} usuario={props.contacto}></Mensaje>
            )
        })}
      </div>
    </div>
  );
}

export default Conversacion;
