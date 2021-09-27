import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
  const [token, setToken] = useState(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{zIndex: 1}}>
      <div className="container">
        <Link className='navbar-brand' to='/'>OpenChat</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {props.usuario.name
            ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {props.usuario.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className='dropdown-item' to='/acerca'>Acerca de</Link>
                  <form action="/api/auth/logout" method="POST">
                    <input type="hidden" name="_token" value={token} />
                    <input type="submit" className='dropdown-item' value="Cerrar sesión" />
                  </form>
                </div>
              </li>
            )
            : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className='nav-link' to='/login'>Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/registrarse'>Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to='/acerca'>Acerca de</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
