import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function ListaDeContactos(props) {
  let [contactos, setContactos] = useState([]);
  useEffect(() => {
    axios.get('/api/contactos')
    .then(res => {
      console.log(res.data);
      setContactos(res.data.contactos);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div id="lista-de-contactos" className="col-3 bg-info p-0">
      {contactos.map(contacto => {
        return (
          <div key={contacto.id} className="contacto py-2 px-3 contacto-hover cursor-pointer" onClick={() => props.setConversacion(contacto)}>
            <p className="mb-0">{contacto.name}</p>
            <p className="mb-0">{contacto.email}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ListaDeContactos;
