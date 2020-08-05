<section class="content-filter">
    <div class="filter">
        <!--<p class="filter-trigger">Фильтр</p>-->
    </div>
    <div class="pagination">
        @if($products->lastPage() > 1)
            @for($i = 1; $i <= $products->lastPage() && $i <=20;$i++)
                <a @if ($products->currentPage() == $i)  {{"class=active"}}  @endif data-page= "{{$i}}"></a>
            @endfor
        @endif
    </div>
</section>
@foreach($products as $product)
    <div class="product-item">
            <img class="p-image" src="/images//test/koleso.png" alt="">
            <h3><a class="product-link" href="{{route('productPage',['model'=>Str::slug($product->product->product_model,'_'),'id'=>$product->option_id])}}">
                {{ $product->product->brand->brand_name }}
                {{mb_strimwidth($product->product->product_model, 0, 20)}}</a></h3>

                <ul>
                    @foreach ($product->options as $key=>$item)
                        <li><span class="product-list-option-title">@lang('ru.'.$key)</span>
                            <span class="product-list-option-desc">{{ $item == 'true' ? 'Да' :  $item}}</span>
                        </li>
                    @endforeach
                </ul>
                <p class="product-list-price">{{$product->price.' ₽'}}</p>

            <span class="basket-block">
                <input type="text" value="1">
                <button data-option-id="{{$product->option_id}}" class="add-basket">
                    <span>Добавить в корзину</span>
                </button>
            </span>
    </div>
@endforeach


