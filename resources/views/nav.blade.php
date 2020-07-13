@if($menu)
<nav>
    <ul class="v-nav">
        <li class="v-nav-item hide700">
            <div class="logo"><a href="/">Империя шин<span>Качество без компромиссов</span></a></div>
        </li>
        @include(env('THEME').'.customMenuItems',['items'=>$menu->roots()])


        <li class="v-nav-item menu-phone hide700">
            @foreach (Config::get('settings.phones') as $item)
                <span>{{$item}}</span>
            @endforeach
        </li>
    </ul>
</nav>
@endif
