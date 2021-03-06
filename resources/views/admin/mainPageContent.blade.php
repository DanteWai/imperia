<ul class="mainPageMenu">
    <li>
        <a href="{{ route('products',['category'=>'shiny']) }}"></a>
        <img src="/images/admin/productIcon.svg" alt="">
        <h2 class="mainPageMenu-header">Товары</h2>
    </li>
    <li>
        <a href="{{ route('brands.index') }}"></a>
        <img src="/images/admin/factoryIcon.svg" alt="">
        <h2 class="mainPageMenu-header">Производители</h2>
    </li>
    <li>
        <a href="{{ route('pages.index') }}"></a>
        <img src="/images/admin/pageIcon.svg" alt="">
        <h2 class="mainPageMenu-header">Страницы</h2>
    </li>
</ul>
@csrf
<h2 class="section-title">Новые заказы</h2>
<table class="table-elements" id="main-orders-component">
    <thead>
    <tr>
        <td>Номер</td>
        <td>Статус</td>
        <td>Количество позиций</td>
        <td>Доставка</td>
        <td>Цена</td>
        <td>Дата</td>
        <td>Дополнительно</td>
    </tr>
    </thead>
    <tbody>
    @foreach($orders as $item)
        <tr>
            <td>{{$item->order_id}}</td>
            <td>{{$item->status['active']['name']}}</td>
            <td>{{count($item->basket)}}</td>
            <td>{{$item->options['getting']}}</td>
            <td>{{$item->price}}</td>
            <td>{{$item->status['active']['date']}}</td>
            <td><a class="full-order" href="{{route('orders.show',['order' => $item->order_id])}}" data-id="{{$item->order_id}}">Открыть</a></td>
        </tr>
    @endforeach
    </tbody>
</table>

