<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatAppController extends Controller
{
  public function obtener_contactos() {
    $contactos = User::where('id', '!=', Auth::user()->id)->get();
    return response()->json([
      'contactos' => $contactos
    ]);
  }

  public function obtener_mensajes($contacto_id) {
    $messages = Mensaje::where('de', '=', Auth::user()->id)
    ->where('para', '=', $contacto_id)
    ->orWhere('para', '=', Auth::user()->id)
    ->where('de', '=', $contacto_id)
    ->get();

    return response()->json([
      'mensajes' => $messages
    ]);
  }
}
