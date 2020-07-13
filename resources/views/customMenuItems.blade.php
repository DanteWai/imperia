@foreach ($items as $key=>$item)

    <li class="v-nav-item" data-title="{{ Str::slug($item->title) }}" {{ (URL::current()) == $item->url() ? "class=active" : ""}}>
        <a href="{{ $item->url()}}"><span>{{$item->title}}</span></a>
        @if($item->hasChildren())
            <ul class="sub-menu">
                @include(env('THEME').'.customMenuItems',['items'=>$item->children()])
            </ul>
        @endif
    </li>
@endforeach

