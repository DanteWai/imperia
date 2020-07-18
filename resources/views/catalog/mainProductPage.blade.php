
<section class="catalog content" id="product-page">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <section class="header">
        <h2>Каталог</h2>
        <h3><span class="brand-name">{{$product->product->brand->brand_name}}</span> {{$product->product->product_model}}</h3>
        <section class="product-navigation">
            <a href="{{route('catalog')}}">Назад</a>
        </section>
    </section>

    <section class="product">
        <div class="product-preview loader-wrap">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            @if(isset($product->options['season']))
                @include('catalog.productIcons')
            @endif
            <img class="p-image" src="/images//test/koleso.png" alt="">
            <span class="product-preview-options">{{($product->options['width'] ?? '').'/'.($product->options['height'] ?? '').' R'.($product->options['radius'] ?? '')}}</span>
            <img class="b-image" src="/images//test/bridgestone.png" alt="">
            <p>Цена <span>{{$product->price.' Р'}}</span> за <span>1шт</span></p>
            <p class="price-four">Цена <span>{{($product->price * 4).' Р'}}</span> за <span>4шт</span></p>
            <span class="basket-count">Количество</span>
            <span class="basket-block">
                <input type="text" value="1">
                <button data-option-id="{{$product->option_id}}" class="add-basket">
                    <svg class="basket-icon">
                        <use xlink:href="/images/sprite.svg#basket"></use>
                    </svg>
                    <span>Добавить в корзину</span>
                </button>
                <button class="remove-basket hide" title="Удалить" data-option-id="{{$product->option_id}}">
                    <svg class="basket-icon">
                        <use xlink:href="/images/sprite.svg#delete"></use>
                    </svg>
                </button>
            </span>
        </div>

        <div class="product-description">
            <ul>
                <li>
                    <span class="desc-name">@lang('ru.brand')</span>
                    <span class="desc">{{$product->product->brand->brand_name}}</span>
                </li>
                <li>
                    <span class="desc-name">@lang('ru.model')</span>
                    <span class="desc">{{$product->product->product_model}}</span>
                </li>
                @foreach($product->options as $name=>$options)
                    @if($name != 'heavy')
                        <li>
                            <span class="desc-name">@lang('ru.'.$name)</span>
                            <span class="desc">{{$options}}</span>
                        </li>
                    @endif
                @endforeach
            </ul>
            <span class="stock">@if($product->count > 0) В наличии, <a target="_blank" href="/contacts">уточнить</a> @endif</span>
        </div>
    </section>

    <h2 class="similar-header">Товары аналогичных параметров</h2>
    <section class="product-list-similar">
        @foreach($analogProduct as $product)
        <div class="product-item">
            <h3><a class="product-link" href="{{route('productPage',['model'=>Str::slug($product->product->product_model,'_'),'id'=>$product->option_id])}}">{{$product->product->product_model}}</a></h3>
            <span>{{($product->options['width'] ?? '').'/'.($product->options['height'] ?? '').' R'.($product->options['radius'] ?? '')}}</span>
            @if(isset($product->options['season']))
                @include(env('THEME').'.catalog.productIcons')
            @endif
            <img class="p-image big" src="{{asset(env('THEME'))}}/images//test/koleso.png" alt="">
            <img class="b-image" src="{{asset(env('THEME'))}}/images//test/bridgestone.png" alt="">
            <p>Цена <span>{{$product->price.' Р'}}</span> за <span>1шт</span></p>
            <p>Цена <span>{{($product->price * 4).' Р'}}</span> за <span>4шт</span></p>
        </div>
        @endforeach
    </section>
</section>
