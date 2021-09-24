import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Mensaje(props) {
  return (
    <div className={`mensaje-wrapper ${props.mensaje.de == props.usuario.id ? 'alinear-izquierda' : 'alinear-derecha'}`}>
      <div className={`mensaje ${props.mensaje.de == props.usuario.id ? 'bg-secondary' : 'bg-primary'}`}>
        {props.mensaje.mensaje}
      </div>
    </div>
  )
}

export default Mensaje;
