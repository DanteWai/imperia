@if($params)
    <section class="main content" id="main-content">
        @csrf
        <ul class="choice-menu" id="choice-menu">
            <li data-choice="shin" data-cat="1" class="category-header active">
                <svg class="choice-icon"><use xlink:href="/images/sprite.svg#shin"></use></svg>
                Шины
            </li>
            <li class="category-header" data-cat="2" data-choice="disk">
                <svg class="choice-icon"><use xlink:href="/images/sprite.svg#disk"></use></svg>
                Диски
            </li>
        </ul>
        <div class="content-choice" id="content-choice">
            @include(env('THEME').'.mainPage.mainContentChoiceList')
        </div>
        <button disabled class="pick">Выберите параметр</button>
        <button class="clear"><svg class="f-btn-close"><use xlink:href="/images/sprite.svg#x"></use></svg>Очистить</button>
    </section>
@endif
