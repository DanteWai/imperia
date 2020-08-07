<ul class="options-group">
    @if(isset($params))
    <li>
        <div class="d-select" data-option-filter="base_option" data-filter="brand_id">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Производитель</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['brand'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item['brand_id']}}">{{$item['brand_name']}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="width">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Ширина</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['width'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="height">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Высота</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['height'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="diameter">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Диаметр</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['diameter'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    @endif
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
