<div class="content-control-buttons">
    <a class="btn bg-back" href="/imperia_admin_panel">Назад</a>
    <a class="btn bg-basic" href="{{ route('productAdd') }}">Добавить элемент</a>
</div>
<h1 class="section-title">{{$title}}</h1>
<ul class="products-categories">
    <li>
        <a class=" @if(Request::is('*/shiny')) active  @endif" href="{{ route('products',['category'=>'shiny']) }}"><svg class="category-icon"><use xlink:href="/images/sprite.svg#shin"></use></svg>Шины</a>
    </li>
    <li>
        <a  @if(Request::is('*/diski')) class='active' @endif href="{{ route('products',['category'=>'diski']) }}"><svg class="category-icon"><use xlink:href="/images/sprite.svg#disk"></use></svg>Диски</a>
    </li>
</ul>

<ul class="paginate">

</ul>
<table id="page-list2" class="table-elements">
    <thead>
    <tr>
        <td>Название</td>
        <td>Количество</td>
        <td>Цена</td>
        <td>Дата изменения</td>
        <td>Удалить</td>
    </tr>
    </thead>
    <tbody>
    @include('admin.products.productList')
    </tbody>
</table>
