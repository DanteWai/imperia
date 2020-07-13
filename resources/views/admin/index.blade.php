<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/admin.css">
    <script src="/js/ckeditor/ckeditor.js"></script>
    <title>{{$title ?? 'Панель администратора'}}</title>
</head>
<body>

    <div id='wrapper'>
        <header class="header">
            <div class="logo">
                <a href="{{route('admin')}}">
                    <img src="/images/admin/logo.svg" alt="">
                </a>
            </div>
            <div class="header-body">
                <a href="/">Выйти</a>
            </div>
        </header>

        <div class="body">
            <div class="nav-wrapper">
                <div class="nav-close"></div>
                {!! $navigation !!}
            </div>
            <div class="content-wrapper">
                {!! $content !!}
            </div>
        </div>

    </div>


    <script src="/js/admin.js"></script>
</body>
</html>
