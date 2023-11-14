<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon"
        href="{{ env('VITE_APP_NAME') == 'FAWARES' ? 'fawares-favicon.ico' : 'ramaka-favicon.ico' }}">

    <title>{{ env('VITE_APP_NAME') == 'FAWARES' ? 'Fawares' : 'Ramaka' }}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">

    {{-- <link href="{{ asset('app.css') }}" rel="stylesheet"> --}}
    @vitereactrefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <style>
        body {
            font-family: 'PT Serif', serif;
        }
    </style>
</head>

<body class="antialiased">
    <div id="example"></div>
</body>

</html>
