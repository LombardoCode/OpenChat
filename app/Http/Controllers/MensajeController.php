<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MensajeController extends Controller
{
  public function store(Request $request) {
    // Creamos un mensaje
    $mensaje = new Mensaje([
      'de' => Auth::user()->id,
      'para' => $request['contacto']['id'],
      'mensaje' => $request['mensaje']
    ]);

    // Gurdamos el mensaje
    if ($mensaje->save()) {
      return response()->json([
        'success' => true,
        'mensaje' => $mensaje
      ]);
    }
  }
}
