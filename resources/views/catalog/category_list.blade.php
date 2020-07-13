

@foreach($brands as $brand)
    <div data-brand="{{$brand->brand_id}}" class="category-item">
        <img class="p-image" src="{{asset(env('THEME'))}}/images//test/bridgestone.png" alt="">
        <p class="category-desc">{{$brand->brand_name}}</p>

        <p class="category-desc">{{ count($brand->options) }} моделей в наличии</p>
        <div class="category-season">
        @if(isset($season) && $season)
            <span class="sun">
                <svg class="product-icon sun-fill"><use xlink:href="{{asset(env('THEME'))}}//images/sprite.svg#sun"></use></svg>Лето<sup>{{$brand->options->where('season','лето')->count()}}</sup>
            </span>
            <span class="snow">
                <svg class="product-icon snow-fill"><use xlink:href="{{asset(env('THEME'))}}//images/sprite.svg#snow"></use></svg>Зима<sup>{{$brand->options->where('season','зима')->count()}}</sup>
            </span>
        @endif
        </div>
    </div>
@endforeach
