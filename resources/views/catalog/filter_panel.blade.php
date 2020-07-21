<h2>Цена</h2>
<div data-type='search' data-option-filter="base_option" data-filter="price" class="filter-price">
    <input type="text" name="min-price" id="min-price" placeholder="от"> <input type="text" name="max-price" id="max-price" placeholder="до">
</div>
<h2>Производитель</h2>
<ul data-option-filter="base_option" data-filter="brand_id">
    @foreach($filter['brand'] as $brand)
        <li data-id="{{ $brand['brand_id'] }}">{{$brand['brand_name']}}</li>
    @endforeach
</ul>
<div class="filter-buttons">
    <button class="btn commit" disabled>Выберите параметры</button>
    <button class="btn reset" disabled>Сбросить</button>
</div>