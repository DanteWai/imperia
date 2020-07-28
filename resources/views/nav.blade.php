@if($menu)
<div class="navigation">
    <nav class="v-nav" id="main-menu">
        <div class="logo">
            <a href="/">Империя шин <span>Качество без компромиссов</span> </a>
        </div>
        <div class="v-nav__burger">
            <span></span>
        </div>
        <ul class="v-nav__menu">
            @include(env('THEME').'.customMenuItems',['items'=>$menu->roots()])
        </ul>
        <div class="v-nav__phone-menu">
            @foreach (Config::get('settings.phones') as $item)
                <a href="tel:{{$item}}">{{$item}}</a>
            @endforeach
        </div>
    </nav>
</div>
@endif