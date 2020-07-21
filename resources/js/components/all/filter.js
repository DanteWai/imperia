import {Component} from "@core/component";
import Server from "@core/servers";

export class FilterComponent extends Component {
   constructor(id) {
      super(id);
  }

   init() {
      this.server = new Server();
      this.token = document.querySelector('[name="_token"]').value;
      this.event = new Event('showFilter',{bubbles: false, cancelable: false});
      this.$catalog = document.getElementById('catalog-content');
      this.$minPrice = document.getElementById('min-price');
      this.$maxPrice = document.getElementById('max-price');
      this.$catalog.addEventListener('click', collapse.bind(this));

      this.$commit = this.$el.querySelector('.commit');
      this.$reset = this.$el.querySelector('.reset');

      this.$el.addEventListener('click', changeParam.bind(this));

      this.$minPrice.addEventListener('blur', changePriceFilter.bind(this));
      this.$maxPrice.addEventListener('blur', changePriceFilter.bind(this));

      // Кнопка "Показать модели"
      this.$commit.addEventListener('click', () => {
         localStorage.setItem('product_parameters_complete', localStorage.getItem('filter_parameters'));
         localStorage.removeItem('filter_parameters');
         document.location.href = "/catalog";
      });

     this.$reset.addEventListener('click', reset.bind(this)); 

   }
   
}

// Сброс фильтра
function reset() {
   this.$minPrice.value = '';
   this.$maxPrice.value ='';
   const params = this.$el.querySelectorAll('[data-id].active');
   params.forEach(elem => elem.classList.remove('active'));
   this.$commit.innerHTML = 'Выберите параметры';
   this.$commit.disabled = true;
   this.$reset.disabled = true;
}

// Показ/скрытие фильтра
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

// Изменение цен
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
   filter.call(this);
}

// Клик по параметру
function changeParam(e) {
   let el = e.target.closest('[data-id]');
   if (el) {
      el.classList.toggle('active');
      filter.call(this);
   }
}

// Количество товара
function filter() {

   let activeElements = this.$el.querySelectorAll('[data-id].active').length;

   if (activeElements || this.$minPrice.value || this.$maxPrice.value) {
      this.$commit.disabled = false;
      this.$reset.disabled = false;
   } else {
      this.$commit.disabled = true;
      this.$reset.disabled = true;
   }

   const id = document.querySelector('.category-header.active').dataset.cat;

   this.server.post('praramlist',jsonRequestData.call(this, id),{'Content-Type': 'application/json;charset=utf-8',},this.token).then(answer => {
      console.log('answer', answer);
      if (answer.count) {
         this.$commit.innerHTML = `Показать ${answer.count} моделей`;
      }
      //this.$commit.disabled = activeElements === 0;
      //this.$reset.disabled = activeElements === 0;
      if (activeElements === 0 && !this.$minPrice.value && !this.$maxPrice.value) this.$commit.innerHTML = 'Выберите параметр';
   })

}

// Формирование данных для запроса на сервер
function jsonRequestData(id) {
   let data = {
      base_option: { category_id: id},
      json_option: {},
      params: {}
  }

  let brand_id = document.querySelector('[data-filter="brand_id"] .active')
  if(brand_id) data.base_option.brand_id = brand_id.dataset.id;

  const minPrice = this.$minPrice.value ? this.$minPrice.value : this.$minPrice.dataset.price;
  const maxPrice = this.$maxPrice.value ? this.$maxPrice.value : this.$maxPrice.dataset.price;

  data.base_option.price = [
      minPrice,
      maxPrice
  ];

  data = JSON.stringify(data)
  console.log(data)
  localStorage.setItem('filter_parameters', data);
  return data;
}