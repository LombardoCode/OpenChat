<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  public function me() {
    return Auth::check() ? Auth::user() : '{}';
  }

  public function register(Request $request) {
    // Reglas de validación para crear un usuario
		$reglas = [
			'nombre' => 'required',
			'email' => 'required|email',
			'password' => 'required|min:6',
			'password_denuevo' => 'required|same:password'
		];

		// Mensajes de error personalizados.
		$mensajesPersonalizados = [
			'nombre.required' => 'El nombre es obligatorio.',
			'email.required' => 'El email es obligatorio.',
			'email.email' => 'El formato del email no es correcto.',
			'password.required' => 'La contraseña es obligatoria.',
			'password.min' => 'La contraseña debe de ser mínimo de 6 caracteres',
			'password_denuevo.required' => 'La confirmación de la contraseña es obligatoria.',
			'password_denuevo.same' => 'Las contraseñas no coinciden.',
		];

		// Realizamos la validación del formulario
		$validaciones = Validator::make($request->all(), $reglas, $mensajesPersonalizados);

		// Si la validación falla...
		if ($validaciones->fails()) {
			// Redireccionamos al usuario de vuelta al formulario
			return redirect()->back()->withErrors($validaciones)->withInput();
		} else {
			// Creamos al usuario
			$usuario = new User([
				'name' => $request['nombre'],
				'email' => $request['email'],
				'password' => bcrypt($request['password'])
			]);

			// Si los datos fueron guardados correctamente...
			if ($usuario->save()) {
				return redirect('/');
			}
		}
  }

  public function login(Request $request) {
    // Reglas de validación de los inputs
		$reglas = [
			'email' => 'required|email',
			'password' => 'required'
		];

		// Errores personalizados de la validación de inputs
		$erroresPersonalizados = [
			'email.required' => 'El email es obligatorio.',
			'email.email' => 'El formato del email no es correcto.',
			'password.required' => 'La contraseña es obligatoria'
		];

		// Validamos el formulario
		$validaciones = Validator::make($request->all(), $reglas, $erroresPersonalizados);

		// Si la validación de los inputs falla...
		if ($validaciones->fails()) {
			return redirect()->back()->withErrors($validaciones)->withInput();
		} else { // Si no falla...
			// Obtenemos las credenciales del usuario
			$credenciales = $request->only('email','password');

			// Si la autenticación es exitosa...
			if (Auth::attempt($credenciales)) {
				$request->session()->regenerate();
				return redirect()->intended('/');
			} else { // Si las credenciales no son las correctas...
				// Devolvemos al usuario con el error de credenciales
				return redirect()->back()->withErrors([
					'credenciales' => 'Las credenciales de acceso no son correctas.'
				]);
			}
		}
  }

  public function logout(Request $request) {
		Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
	}
}
