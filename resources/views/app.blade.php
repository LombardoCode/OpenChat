<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    <!-- Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
  </head>
  <body>
    <div id="app" usuario="{{ Auth::check() ? Auth::user() : '{}' }}"></div>
    <script src="{{ asset('js/app.js') }}" defer></script>
  </body>
</html>
