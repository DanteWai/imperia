@extends(env('THEME').'.layouts.site')
<div class="wrapper catalog-wrapper">
    @yield('nav')
    @yield('basket')
    @yield('content')
    @yield('footer')
</div>