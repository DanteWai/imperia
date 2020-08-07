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
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="mount">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Сверловка</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['mount'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="departure">
            <div class="d-select__input" data-type="input">
                <span data-type="value">Вылет</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['departure'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    <li>
        <div class="d-select" data-option-filter="json_option" data-filter="dia">
            <div class="d-select__input" data-type="input">
                <span data-type="value">DIA</span>
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
            <div class="d-select__dropdown">
                <ul class="d-select__list">
                    @foreach($params['dia'] as $item)
                        <li class="d-select__item" data-type="item" data-id="{{$item}}">{{$item}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    </li>
    @endif
</ul>