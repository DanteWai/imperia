{!! $top !!}
<table id="page-list2" class="table-elements">
    <thead>
    <tr>
        <td>Название</td>
        <td>Дата изменения</td>
        <td>Удалить</td>
    </tr>
    </thead>
    <tbody>
    @foreach($lists as $list)
        <tr>
            <td>{{$list->price_name}}</td>
            <td>{{$list->updated_at}}</td>
            <td></td>
        </tr>
    @endforeach
    </tbody>
</table>
