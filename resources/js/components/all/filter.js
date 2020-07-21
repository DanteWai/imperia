import {Component} from "@core/component";
import Server from "@core/servers";

export class FilterComponent extends Component {
   constructor(id) {
      super(id);
  }

   init() {
      this.server = new Server();
      this.event = new Event('showFilter',{bubbles: false, cancelable: false});
      this.$catalog = document.getElementById('catalog-content');
      this.$minPrice = document.getElementById('min-price');
      this.$maxPrice = document.getElementById('max-price');
      this.$catalog.addEventListener('click', collapse.bind(this));

      this.$minPrice.addEventListener('blur', changePriceFilter.bind(this));
      this.$maxPrice.addEventListener('blur', changePriceFilter.bind(this));
   }
}

function collapse(e) {
   const target = e.target.closest('.filter');
   let priceList = document.querySelectorAll('.product-list-price');
   let minPrice = this.$minPrice;
   let maxPrice = this.$maxPrice;
   let price = [];
   let max = 0;
   let min = 0;

   if (target) {

      this.$el.classList.toggle('active');
      const icon = (this.$el.classList.contains('active')) ? 'arrow-left' : 'filter';
      target.innerHTML = `
      <svg class="filter-icon">
         <use xlink:href="/public/images/sprite.svg#${icon}"></use>
      </svg>
      `;

      if (this.$el.classList.contains('active')) {

         priceList.forEach(item => price.push(Number(item.dataset.price)));
         max = Math.max.apply(null, price);
         min = Math.min.apply(null, price);

         minPrice.placeholder += ` ${min}`;
         minPrice.dataset.price = min;
         maxPrice.placeholder += ` ${max}`;
         maxPrice.dataset.price = max;
      } else {
         minPrice.placeholder = 'от';
         minPrice.dataset.price = 0;
         maxPrice.placeholder = 'до';
         maxPrice.dataset.price = 0;
      }

      this.$el.dispatchEvent(this.event);
   }
}

function changePriceFilter(e) {
   const target = e.target;
   const price = Number(target.dataset.price);
   let min = 0;
   let max = 0;
   let elem;
   
   let value = Number(target.value);

   if (target.name === 'min-price') {
      elem = target.nextElementSibling;
      min = price;
      max = elem.value ? Number(elem.value) : Number(elem.dataset.price);
   } else {
      elem = target.previousElementSibling
      max = price;
      min = elem.value ? Number(elem.value) : Number(elem.dataset.price);
   }

   value = Number.isNaN(value) ? price : Math.min(Math.max(value, min) , max); //Проверка на nan и на диапазон
   target.value = value;
}