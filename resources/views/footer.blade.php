<footer>

    <!-- loader -->
    <div class="loader-wrap hide" id="loader">
        <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <!-- /loader-->

    <span> © «Империя шин» 2016 — 2019</span>
    <div class="btn-wrap">
        <div class="f-button" id="write">
            <div class="js-collapse collapse">
                {!! Form::open(['url'=>route('footerMessages'),'method'=>'POST', 'novalidate' => true]) !!}
                    <svg class="f-btn-close">
                        <use xlink:href="/images/sprite.svg#x"></use>
                    </svg>
                    <div class="form-row">
                        <label for="FIO">ФИО</label>
                        <input type="text" name="fio" id="fio">
                    </div>
                    <div class="form-row">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div class="form-row">
                        <label for="tel">Номер телефона:</label>
                        <input type="tel" name="phone" id="phone">
                    </div>
                    <div class="form-row">
                        <label for="message">Сообщение</label>
                        <textarea name="message" id="message" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit" class="send">Отправить</button>
                {!! Form::close() !!}
            </div>
            <span class="write">Написать нам</span>
        </div>
        <div class="f-button" id="call">
            <div class="js-collapse collapse">
                {!! Form::open(['url'=>route('footerMessages'),'method'=>'POST']) !!}
                    <svg class="f-btn-close">
                        <use xlink:href="/images/sprite.svg#x"></use>
                    </svg>
                    <div class="form-row">
                        <label for="">Укажите номер телефона:</label>
                        <input type="tel" name="phone" id="phone">
                    </div>
                    <button type="submit" class="send">Отправить</button>
                {!! Form::close() !!}
            </div>
            <span class="call">Заказать звонок</span>
        </div>
    </div>
</footer>
