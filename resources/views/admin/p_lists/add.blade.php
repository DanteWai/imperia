{!! $top !!}
<h1 class="section-title">Добавление прайс листа</h1>

<section class="content-wrapper form">




    {!! Form::open(['class'=>'addProduct','url'=>route('list_import'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}

    <div class="form-body">
        <div class="form-section">
            <label for="parser_name">Название</label>
            <input class="form-model text-input" type="text" placeholder="Название" name="parser_name" id="parser_name" value="Тестовый прайс">
        </div>
    </div>
    <div>
        {{Form::file('list',['id'=>'list','class'=>'inputFile','data-multiple-caption'=>'{count} files selected'])}}
        <label for="list" class="h-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
            </svg>
            <span>Загрузить файл</span>
        </label>
        {{Form::submit('Подтвердить',['class'=>'btn bg-success'])}}
    </div>
    <div>

    </div>



    {{ Form::close() }}

    <button id="save" class="btn" disabled>Сохранить прайс</button>



    <br>
    @if(isset($products))
        <div class="tabs-contaiter">
            @foreach (array_keys($products) as $type)
                <p data-t-article="{{ 'tab'.$type }}" class="tab-atricle">{{ $types[$type] }}</p>
            @endforeach

            @foreach ($products as $key=>$type)
                <div  data-t-source="{{ 'tab'.$key}}" class="tab-source">
                    <p>Колечество: {{ count($type) }}</p>
                    <table id="parse" class="table-elements">
                        <thead>
                        <tr>
                            @isset($type[0]['brand'])<td>Производитель</td>@endisset
                            @isset($type[0]['all'])<td>Остальное</td>@endisset
                            @isset($type[0]['width'])<td>Ширина</td>@endisset
                            @isset($type[0]['height'])<td>Высота</td>@endisset
                            @isset($type[0]['radius'])<td>Диаметр</td>@endisset
                            @isset($type[0]['index'])<td>Индекс</td>@endisset
                            @isset($type[0]['spikes'])<td>Шипы</td>@endisset

                            @isset($type[0]['drilling'])<td>Сверловка</td>@endisset
                            @isset($type[0]['diametr'])<td>Диаметр</td>@endisset
                            @isset($type[0]['departure'])<td>Вылет</td>@endisset
                            @isset($type[0]['dia'])<td>DIA</td>@endisset

                            @isset($type[0]['season'])<td>Сезон</td>@endisset
                            @isset($type[0]['price'])<td>Цена</td>@endisset

                            <td>Скобки</td>
                            @isset($type[0]['type'])<td>Тип</td>@endisset
                            <td>Цена</td>

                        </tr>
                        </thead>
                        <tbody>
                        @foreach ($type as $row)
                            <tr>
                                @isset($row['brand'])<td>{{ $row['brand']}}</td>@endisset
                                @isset($row['all'])<td>{{ $row['all'] }}</td>@endisset
                                @isset($row['width'])<td>{{ $row['width']}}</td>@endisset
                                @isset($row['height'])<td>{{ $row['height']}}</td>@endisset
                                @isset($row['radius'])<td>{{ $row['radius']}}</td>@endisset
                                @isset($row['index'])<td>{{ $row['index']}}</td>@endisset
                                @isset($row['spikes'])<td>{{ $row['spikes']}}</td>@endisset

                                @isset($row['drilling'])<td>{{ $row['drilling']}}</td>@endisset
                                @isset($row['diametr'])<td>{{ $row['diametr']}}</td>@endisset
                                @isset($row['departure'])<td>{{ $row['departure']}}</td>@endisset
                                @isset($row['dia'])<td>{{ $row['dia']}}</td>@endisset

                                @isset($row['season'])<td>{{ $row['season']}}</td>@endisset
                                @isset($row['price'])<td>{{ $row['price']}}</td>@endisset


                                <td>{{ $row['dop'] ?? '-'}}</td>
                                @isset($row['type'])<td>{{ $row['type']}}</td>@endisset
                                <td></td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            @endforeach
        </div>
    @endif
</section>
