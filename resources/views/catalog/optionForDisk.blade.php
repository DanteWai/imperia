<ul>
    <li>
        <select  data-option-filter="json_option" data-filter="width" class="select">
            <option value="" selected disabled hidden>Ширина</option>
            @foreach($params['width'] as $item)
                <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
            @endforeach
        </select>
    </li>

    <li>
        <select  data-option-filter="json_option" data-filter="diameter" class="select">
            <option value="" selected disabled hidden>Диаметр</option>
            @foreach($params['diameter'] as $item)
                <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
            @endforeach
        </select>
    </li>
    <li>
            <select  data-option-filter="json_option" data-filter="mount" class="select">
                <option value="" selected disabled hidden>Сверловка</option>
                @foreach($params['mount'] as $item)
                    <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
                @endforeach
            </select>
        </li>
        <li>
                <select  data-option-filter="json_option" data-filter="departure" class="select">
                    <option value="" selected disabled hidden>Вылет</option>
                    @foreach($params['departure'] as $item)
                        <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
                    @endforeach
                </select>
            </li>
            <li>
                <select  data-option-filter="json_option" data-filter="dia" class="select">
                    <option value="" selected disabled hidden>DIA</option>
                    @foreach($params['dia'] as $item)
                        <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
                    @endforeach
                </select>
            </li>
            <li>
                <select  data-option-filter="json_option" data-filter="dia" class="select">
                    <option value="" selected disabled hidden>Производитель</option>
                    @foreach($params['brand'] as $item)
                        <option data-type="radio" data-id="{{  $item['brand_id']}}">{{$item['brand_name']}}</option>
                    @endforeach
                </select>
            </li>
</ul>