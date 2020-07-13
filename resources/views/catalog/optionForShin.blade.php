<ul >



    <li>
        <select  data-option-filter="json_option" data-filter="width" class="select">
            <option value="" selected disabled hidden>Ширина</option>
            @foreach($params['width'] as $item)
                <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
            @endforeach
        </select>
    </li>
    @if(isset($params))
    <li>
        <select  data-option-filter="json_option" data-filter="height" class="select">
            <option value="" selected disabled hidden>Высота</option>
            @foreach($params['height'] as $item)
                <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
            @endforeach
        </select>
    </li>
    @endif
    <li>
        <select  data-option-filter="json_option" data-filter="radius" class="select">
            <option value="" selected disabled hidden>Радиус</option>
            @foreach($params['diameter'] as $item)
                <option data-type="radio" data-id="{{$item}}">{{$item}}</option>
            @endforeach
        </select>
    </li>
    <li>
        <span data-option-filter="json_option" data-filter="season" class="season-choice">
            <input data-type="radio" data-id="лето" type="radio" name="season-c" id="sun-с">
            <label for="sun-с"><span>Лето</span></label>
            <input data-type="radio" data-id="зима" type="radio" name="season-c" id="snow-с">
            <label for="snow-с">Зима</label>
        </span>
        <span data-option-filter="json_option" data-filter="heavy" class="season-choice">
            <input data-type="radio" data-id="true" type="radio" name="season-c" id="ship">
            <label for="ship">Шипы</label>
        </span>
    </li>
</ul>
