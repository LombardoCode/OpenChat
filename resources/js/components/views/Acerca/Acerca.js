import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Acerca() {
  return (
    <div className="bg-primary fondo pt-4">
      <div className="container px-4 text-white fnt-quicksand my-6">
        <p className="text-center text-2xl">Este proyecto ha sido realizado por:</p>
        <p className="text-center text-4xl">Lombardo Moreno Rodríguez</p>
        <p className="text-center text-xl mb-5">2021</p>
        <div className="d-flex flex-column flex-md-row justify-center">
          <a href="https://www.linkedin.com/in/lombardo-m-bba399218/" className="text-2xl bordes-botones px-3 padding-top-bottom margin-derecha rounded-md mb-5 text-center text-decoration-none hover-boton transition-all">
            <i className="fab fa-linkedin mr-2"></i>
            Linked in
          </a>
          <a href="https://github.com/LombardoCode/openchat" className="text-2xl bordes-botones px-3 padding-top-bottom rounded-md mb-5 text-center text-decoration-none hover-boton transition-all">
            <i className="fab fa-github mr-2"></i>
            Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default Acerca;
