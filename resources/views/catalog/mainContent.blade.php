@if($params)
<section class="catalog content" id="catalog-content">
    @csrf
    <section class="header" id="header">
        <h2>
            Категория
            <span class="header-category-wrap">
                @foreach($categories as $number=>$category)
                    <p class="@if($number == 0) {{'active' }}  @endif category-header m-0" data-cat="{{$category->category_id}}" data-name="{{$category->category_alias}}">{{$category->category_name}}</p>
                @endforeach
            </span>
        </h2>
        <div class="options-panel" id="options-panel">
            {!! $option_panel !!}
        </div>
    </section>
    <section class="product-list" id="product-list">
        {!! $list !!}

        <div id="back-options" class="hide">
            <span data-max-price>{{ $max_price }}</span>
        </div>
    </section>

</section>

@endif
