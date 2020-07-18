import {Component} from '@core/component';
import {addBasket} from './catalogProducts';
import {changeBasket} from './catalogContent';
import {deleteElement} from './basket';

export class ProductPageComponent extends Component {
   constructor (id, basket) {
      super(id, false);
      this.basket = basket;
      this.$el && this.init();
   }

   init() {

      this.$addBtn = this.$el.querySelector('.add-basket');
      this.$removeBtn = this.$el.querySelector('.remove-basket');
      this.$countLabel = this.$el.querySelector('.basket-count');
      this.$input = this.$el.querySelector('.basket-block > input');

      this.event = new Event('showBasket',{bubbles: false, cancelable: false});
      this.id = this.$addBtn.dataset.optionId;
      this.json = localStorage.getItem('basket');

      this.$addBtn.addEventListener('click', addBasket.bind(this));
      this.$el.addEventListener('showBasket', changeBasket.bind(this));

      this.$removeBtn.addEventListener('click', deleteElement.bind(this.basket));

      if (this.basket.json && Object.keys(JSON.parse(this.basket.json)).includes(this.id)) {
         this.$countLabel.classList.add('hide');   // скрываем надпись
         this.$input.classList.add('hide');        // скрываем инпут
         this.$addBtn.disabled = true;             // блокируем кнопку
         this.$addBtn.innerHTML = `
            <span>Товар в корзине</span>
         `;
         this.$removeBtn.classList.remove('hide'); // показываем кнопку удаления
      }
   }
}