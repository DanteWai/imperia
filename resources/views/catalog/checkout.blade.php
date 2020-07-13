<section class="catalog content">
  <section class="checkout">
      <div class="registration" id="order">
          <h2>Оформление заказа</h2>
            {!! Form::open(['id'=>'order-form','url'=>route('checkout_output'),'method'=>'POST','enctype'=>'multipart/form-data']) !!}
              <h3>Контактная информация</h3>
              <label for="fname"><i class="fa fa-user"></i> ФИО</label>
              <input type="text" id="name" name="name" placeholder="Иван иванов">
              <label for="email"><i class="fa fa-envelope"></i> Электронная почта</label>
              <input type="text" id="email" name="email" placeholder="ivan@example.com">
              <label for="phone"><i class="fa fa-address-card-o"></i> Мобильный телефон</label>
              <input type="text" id="phone" name="phone" placeholder="8 800 800 80 80">
              <span class="message">* Поле обязательно для заполнения</span>

              <h3>Способ получения</h3>

              <input class="radio-input" type="radio" name="getting" value="delivery" id="delivery">
              <label for="delivery">Доставка</label>
              <input disabled class="delivery-desc" type="text" id="adr" name="address" placeholder="Адрес доставки">

              <input class="radio-input" type="radio" name="getting"  value="pickup" id="pickup">
              <label for="pickup">Самовывоз</label>
              <p class="pickup-desc">г. Кемерово, ул. Тухачевского, 50/4, Рынок "СОТКА" Блок 8  Магазин "Автоцентр" </p>

              <h3>Оплата</h3>
              <input disabled class="radio-input" type="radio" name="payment" value="delivery_p" id="delivery_p">
              <label for="delivery_p">Оплата наличными при получении заказа</label>

              <input disabled class="radio-input" type="radio" name="payment" value="pickup_p" id="pickup_p">
              <label for="pickup_p">Оплата наличными или банковской картой в пункте самовывоза</label>


              <input id="complete" type="submit" disabled value="Готово">
          {!! Form::close() !!}
        </div>
    <div class="basket big" id="basket">
      <span class="basket-count-p">0</span>
      <div class="basket-body">
      <div class="basket-header">Товары</div>
      <ul class="basket-list">
      </ul>
      </div>
    </div>

  </section>
</section>
