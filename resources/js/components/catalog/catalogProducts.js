import {Component} from "@core/component";
import Server from "@core/servers";
import Lang from '@js/lang/lang';
import {LoaderComponent} from "@js/components/all/loader";
import {PriceFilter} from "@js/components/catalog/priceFilter";

export class CatalogProductsComponent extends Component {
    constructor(id) {
        super(id);
        this.loader = new LoaderComponent();
    }

    init(){
        this.json = ''
        this.server = new Server();

        this.page = 1;
        this.sort = {
            sortName: 'price',
            sortType: 'desc'
        };
        this.count = 10;

        this.priceMaxLimit = this.$el.querySelector('[data-max-price]').textContent

        this.$el.addEventListener('click', changeParameters.bind(this));    // Изменение параметров сортировки/пагниации/кол-ва
        this.$el.addEventListener('click',addBasket.bind(this))
        this.$el.addEventListener('click', toggleSort.bind(this));
        this.event = new Event('showBasket',{bubbles: false, cancelable: false});
    }

    async send(json, token){
        this.loader.mount(this.$el)
        this.json = json;
        await this.server.post('catalog/list',json,{'Content-Type': 'application/json;charset=utf-8'},token).then(answer =>{
            //console.log('catalogProduct send', answer);
            if(answer.data){
                this.$el.innerHTML = productsRender.call(this, answer);
                endLoadCatalog.call(this) //функция завершения каталога
                this.loader.unmount(this.$el) //снятие лоадера
            }
        })

    }
}

function productsRender(object){ // рендер шаблона

    if (object.data.length) {

        let pagination = '';
        // рендер кнопок пагинации

        if (object.last_page > 1) {
            for (let i = 1; i <= object.last_page && i <= 20; i++) {
                pagination += `
                    <li class="pagination__item">
                        <a ${(object.current_page === i) ? 'class="pagination__link active"' : 'class="pagination__link"'}  data-page="${i}">${i}</a>
                    </li>
                `
            }
        }

        let basket = (localStorage.getItem('basket')) ? Object.keys(JSON.parse(localStorage.getItem('basket'))) : [];

        // рендер карточек товаров
        const products = object.data.map(item => {
            const brandName = item.product.product_model.toLowerCase().replace(/ /g, '_').replace(/[.]/g, '');
            const id = item.option_id;
            return `
                <div class="product-item">
                    <img class="p-image" src="/images//test/koleso.png" alt="">
                    <h3>
                        <a class="product-link" href="catalog/${brandName}/${id}">
                            ${item.product.brand.brand_name}
                            ${item.product.product_model.slice(0, 20)}
                        </a>
                    </h3>
                    <ul>
                        ${Object.keys(item.options).map(option => {
                            return `
                                <li>
                                    <span class="product-list-option-title">${Lang.get(`ru.${option}`)}</span>
                                    <span class="product-list-option-desc">${(item.options[option] === 'true') ? 'Да' : item.options[option]}</span>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                    <p class="product-list-price" data-price="${item.price}">${item.price} P</p>
                    <span class="basket-block">
                        <input type="text" value="1" ${(basket.includes(id.toString())) ? 'class="hide"' : ''}>
                        <button data-option-id="${id}" class="add-basket" ${ (basket.includes(id.toString())) ? 'disabled' : '' }>
                            ${ (basket.includes(id.toString())) ?
                                '<span>Товар в корзине</span>' :
                                '<span>Добавить в корзину</span>'
                            }
                        </button>
                    </span>
                </div>
            `;
        }).join('');

        let priceFilter = new PriceFilter({priceMaxLimit: this.priceMaxLimit}).getTemplate()

        return `
            <section class="content-filter">
                <div class="sort">
                ${priceFilter}

                <div class="sort-item">
                    <span class="sort-item__title">Упорядочить:</span>
                    <div class="sort-action">
                        <div class="sort-action__wrapper"></div>
                        <div class="sort-action__header">
                            ${this.sort.sortName === 'price' && this.sort.sortType === 'desc' ? '<span class="sort-action__current">по возрастанию цены</span>' : '<span class="sort-action__current">по убыванию цены</span>'}
                        </div>
                        <div class="sort-action__body">
                            <div class="sort-action__item" data-sort-type="desc">по возрастанию цены</div>
                            <div class="sort-action__item" data-sort-type="asc">по убыванию цены</div>
                        </div>
                    </div>
                </div>

                <div class="sort-item">
                    <span class="sort-item__title">Показывать по:</span>
                    <div class="sort-action">
                        <div class="sort-action__wrapper"></div>
                        <div class="sort-action__header">
                            <span class="sort-action__current">${this.count}</span>
                        </div>
                        <div class="sort-action__body">
                            <div class="sort-action__item" data-count-goods="10">10</div>
                            <div class="sort-action__item" data-count-goods="15">15</div>
                            <div class="sort-action__item" data-count-goods="20">20</div>
                            <div class="sort-action__item" data-count-goods="30">30</div>
                            <div class="sort-action__item" data-count-goods="50">50</div>
                        </div>
                    </div>
                </div>

                </div>

                <div class="pagination">
                    <ul class="pagination__list">
                        ${pagination}
                    </ul>
                </div>
            </section>
            ${products}
        `;

    } else {

        return `
            <div class="goods-empty" style="display: flex">
                <p>К сожалению по Вашим параметрам подходящих товаров не найдено:(</p>
                <p>Попробуйте изменить критерии поиска</p>
            </div>
        `;

    }
}

export function addBasket(e){
    let el = e.target.closest('.add-basket');
    const input = el ? el.previousElementSibling : null;
    if(el && !el.disabled){
        el.disabled = true
        el.innerHTML = "<span>Товар в корзине</span>"
        input.classList.add('hide');

        //Страница товара
        this.$countLabel ? this.$countLabel.classList.add('hide') : '';     // Удаляем надпись "количество" при добавлении товара в корзину из карточки
        this.$removeBtn ? this.$removeBtn.classList.remove('hide') : '';    // Показываем кнопку "удалить" в карточке товара
        //

        let value = Math.floor(Number(el.previousElementSibling.value));
        value = Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1) , 10) //Проверка на nan и на диапазон

        addBasketJson(el.dataset.optionId , value);
        el.previousElementSibling.value = 1;        // Возвращаем input в исходное значение
        this.$el.dispatchEvent(this.event)
    }
}

export function addBasketJson(id,count) {
    let basket = localStorage.getItem('basket')
    let data = {}

    if(basket)  data = JSON.parse(basket)

    data[id] = count
    localStorage.setItem('basket',JSON.stringify(data))
}

function changeParameters(e) {
    const target = e.target;

    switch (target) {
        case target.closest('[data-page]'):
            pagination.call(this, target);
            break;
        case target.closest('[data-sort-type]'):
            sort.call(this, target);
            break;
        case target.closest('[data-count-goods]'):
            countGoods.call(this, target);
            break;
        default:
            return;
    }
}

function pagination(el){
    if(el && !el.classList.contains('active')) {
        let paginations = this.$el.querySelectorAll('.pagination a.active')
        paginations.forEach(el => {
            el.classList.remove('active')
        })
        el.classList.add('active')

        this.page = el.dataset.page
        this.$el.dispatchEvent(new CustomEvent('change-page', {detail: {page: this.page, sort: this.sort, count: this.count}})) //detail - контейнер для аргументов события
    }
}

function sort(el) {
    if (el) {
        this.sort.sortType = el.dataset.sortType;
        this.$el.dispatchEvent(new CustomEvent('change-sort', {detail: {page: this.page, sort: this.sort, count: this.count}}));
    }
}

function countGoods(el) {
    if (el) {
        this.count = el.dataset.countGoods;
        this.$el.dispatchEvent(new CustomEvent('change-sort', {detail: {page: this.page, sort: this.sort, count: this.count}}));
    }
}



function toggleSort(e) {
    const target = e.target.closest('.sort-action');
    if (target) {
        if (target.classList.contains('active')) {
            target.classList.remove('active');
            return;
        }
        const otherList = target.closest('.sort').querySelectorAll('.sort-action');
        otherList.forEach(item => {
            item.classList.remove('active');
        });
        target.classList.add('active');
    }
}

function endLoadCatalog() {
   /* this.$minPrice = document.getElementById('min-price');
    this.$maxPrice = document.getElementById('max-price');
    this.$minPrice.addEventListener('change', changePrice.bind(this));
    this.$maxPrice.addEventListener('change', changePrice.bind(this));*/
}
