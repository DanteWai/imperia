

@if (isset($params))
    @foreach($params as $name=>$items)


        <div class="choice-list">
            <h4>{{ Lang::get('ru.'.$name)}}</h4>
            @if (!empty($items))
            <ul data-option-filter="{{ is_array($items[0]) ? 'base_option' : 'json_option'}}" data-filter="{{$name === 'brand' ? 'brand_id' : $name}}" class="scrollbar-inner">
                @foreach($items as $key=>$item)
                    @if(is_array($item))
                        <li data-id="{{ $item[0] ?? $item['brand_id']}}">{{$item[1] ?? $item['brand_name']}}</li>
                    @else
                        <li data-id="{{$item}}">{{$item}}</li>
                    @endif
                @endforeach
            </ul>
            @endif
        </div>

    @endforeach
@endif
    @if (isset($params['height']))
    <span class="season-choice">
        <span data-option-filter="json_option" data-filter="season" data-choice-others="shin" >
            <input data-type="radio" data-id="лето"  type="radio" name="season-c" id="sun-с">
            <label for="sun-с">Лето</label>
            <input data-type="radio" data-id="зима" type="radio" name="season-c" id="snow-с">
            <label for="snow-с">Зима</label>
        </span>
    @endif

    @if (isset($params['height']))
            <span data-option-filter="json_option" data-filter="heavy" data-choice-others="shin">

                <input data-type="radio" data-id="true" type="radio" name="heavy" id="cargo">
                <label for="cargo">Шипы</label>
            </span>
        </span>
        @endif
