<footer>
    <span> © «Империя шин» 2016 — 2019</span>
    <div class="btn-wrap">
        <div class="f-button" id="write">
            <div class="collapse">
                <svg class="f-btn-close">
                    <use xlink:href="{{asset(env('THEME'))}}/images/sprite.svg#x"></use>
                </svg>
                <label for="FIO">ФИО</label>
                <input type="text" name="" id="">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="">
                <label for="tel">Номер телефона:</label>
                <input type="tel" name="tel" id="">
                <label for="message">Сообщение</label>
                <textarea name="message" id="" cols="30" rows="10"></textarea>
                <button>Отправить</button>
            </div>
            <span>Написать нам</span>
        </div>
        <div class="f-button" id="call">
            <div class="collapse">
                <svg class="f-btn-close">
                    <use xlink:href="{{asset(env('THEME'))}}/images/sprite.svg#x"></use>
                </svg>
                <label for="">Укажите номер телефона:</label>
                <input type="tel" name="tel" id="">
                <button>Отправить</button>
            </div>
            <span>Заказать звонок</span>
        </div>
    </div>
</footer>