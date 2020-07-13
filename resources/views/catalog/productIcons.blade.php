<span>
    <span title="Сезон">
        @if($product->options['season']=='лето')
            <svg class="product-icon sun-fill">
                <use xlink:href="{{asset(env('THEME'))}}//images/sprite.svg#sun"></use>
            </svg>
        @elseif($product->options['season']=='зима')
            <svg class="product-icon snow-fill">
                <use xlink:href="{{asset(env('THEME'))}}//images/sprite.svg#snow"></use>
            </svg>
        @endif
    </span>

    @if(isset($product->options['heavy']))
        @if($product->options['heavy']=='true')
            <span title="Грузовая">
                <svg class="product-icon heavy-fill">
                    <use xlink:href="{{asset(env('THEME'))}}/images/sprite.svg#heavy"></use>
                </svg>
            </span>
        @endif
    @endif
</span>
