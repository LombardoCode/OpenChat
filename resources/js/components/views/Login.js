import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Login() {
  let [token, setToken] = useState(document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

  return (
    <div className="bg-primary h-100">
      <div className="pt-3 container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-7">
            <div className="bg-white pt-4 pb-2 px-3">
              <h1 className="h3 text-center ">Iniciar sesión</h1>
              <form action="/api/auth/login" method="POST">
                <input type="hidden" name="_token" value={token}></input>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" className="form-control" placeholder="Ingrese su correo electrónico..."/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" name="password" id="password" className="form-control" placeholder="Ingrese su contraseña..."/>
                </div>
                <div className="form-group">
                  <input type="submit" value="Entrar" className="btn btn-primary btn-block btn-lg" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
