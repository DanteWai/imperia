import {Component} from "@core/component";
import Server from "@core/servers";
import Lang from '@js/lang/lang';

export class CatalogProductsComponent extends Component {
    constructor(id) {
        super(id)
    }

    init(){
        this.json = ''
        this.server = new Server();
        this.page = 1;
        this.$el.addEventListener('click',pagination.bind(this))
        this.$el.addEventListener('click',addBasket.bind(this))
        this.event = new Event('showBasket',{bubbles: false, cancelable: false});
    }

    send(json, token){
        this.json = json;
        this.server.post('catalog/list',json,{'Content-Type': 'application/json;charset=utf-8'},token).then(answer =>{
            //console.log('answer', answer)

            if(answer.data){
                this.$el.innerHTML = productsRender(answer);
            }
        })
    }
}

function productsRender(object){ // рендер шаблона

    let pagination = '';

    // рендер кнопок пагинации
    if (object.last_page > 1) {
        for (let i = 1; i <= object.last_page && i <= 20; i++) {
            pagination += `<a ${(object.current_page === i) ? 'class="active"' : ''} data-page="${i}"></a>`;
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
                <p class="product-list-price">${item.price} P</p>
                <span class="basket-block">
                    <input type="text" value="1">
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

    // рендер всего шаблона
    return `
        <section class="content-filter">
            <div class="filter">
                <!--<p class="filter-trigger">Фильтр</p>-->
            </div>
            <div class="pagination">
                ${pagination}
            </div>
        </section>
        ${products}
    `;
}

function addBasket(e){
    let el = e.target.closest('.add-basket');
    if(el && !el.disabled){
        el.disabled = true
        el.innerHTML = "<span>Товар в корзине</span>"

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

function pagination(e){
    let el = e.target.closest('[data-page]');
    if(el && !el.classList.contains('active')) {
        let paginations = this.$el.querySelectorAll('.pagination a.active')
        paginations.forEach(el => {
            el.classList.remove('active')
        })
        el.classList.add('active')

        this.page = el.dataset.page
        this.$el.dispatchEvent(new CustomEvent('change-page',{detail:this.page}))
    }
}

