//Главный компонент отображения каталога
import {Component} from "@core/component";
import {CatalogHeaderComponent} from "./catalogHeader";
import {CatalogProductsComponent} from "./catalogProducts";
import Server from "@core/servers";
import {LoaderComponent} from "@js/components/all/loader";
import Select from "@core/select";


export class CatalogContentComponent extends Component {
    constructor(id, {basket}) {
        super(id, false)
        this.basket = basket;
        this.loader = new LoaderComponent();
        this.$el && this.init();
    }

    init(){
        new Select('.d-select',{multiple:true})
        this.header = new CatalogHeaderComponent('header')
        this.catalog = new CatalogProductsComponent('product-list');
        this.server = new Server();
        this.token = this.$el.querySelector('[name="_token"]').value

        //Смена категории в шапке
        this.header.$el.addEventListener('change-category', changeCategory.bind(this))
        //Смена параметра поиска товара
        this.header.$el.addEventListener('change-param', changeParam.bind(this))
        //Клик по карточке производителя
        this.catalog.$el.addEventListener('click', clickBrand.bind(this))
        //смена страницы
        this.catalog.$el.addEventListener('change-page', changeParam.bind(this))
        // смена сортировки
        this.catalog.$el.addEventListener('change-sort', changeParam.bind(this))
        //показ корзины
        this.catalog.$el.addEventListener('showBasket', changeBasket.bind(this));

        checkJSON.call(this)
    }

}



//Событие при изменении содержимого корзины
export function changeBasket() {
    //рендерит корзину
    this.basket.json = localStorage.getItem('basket');
    this.basket.fill();
    this.basket.show();
}
//Смена категории
async function changeCategory(){
    //посылает запрос при смене основной категории и получает новый html
    this.loader.mount(this.catalog.$el);
    let answer = await this.server.post('catalog/switch',{category_id:this.header.category_id},{},this.token)
    if(answer.option_panel && answer.list){
        //console.log(answer.list)
        this.header.optionPanel.innerHTML = answer.option_panel //смена доступных для товара опций
        this.catalog.$el.innerHTML = answer.list // product-list
        new Select('.d-select',{multiple:true})
        this.loader.unmount(this.catalog.$el);
    }
}
//События клика по карточке бренда
function clickBrand(e){
    let target = e.target.closest('.category-item')
    if(target){
        const brand = this.header.optionPanel.querySelector(`[data-filter="brand_id"] [data-id="${target.dataset.brand}"]`);
        const brandLabel = this.header.optionPanel.querySelector('[data-filter="brand_id"] [data-type="value"]');
        brand.classList.add('active');
        brandLabel.textContent = brand.textContent;
        let data = creationJSON.call(this,{brand_id:target.dataset.brand, isJsonOptions:false, page:1})
        this.catalog.send(JSON.stringify(data),this.token)
    }
}
//Событие смена параметра товара
function changeParam(e){
    let data = creationJSON.call(this, e.detail)
    this.catalog.send(JSON.stringify(data),this.token)
}
//Формирует json для отправки на сервер
function creationJSON({page =1, sort = {sortName: 'price', sortType: 'desc'}, count = 10, isJsonOptions = true, brand_id}){
    let data = {
        products: { category_id: this.header.category_id, },
        options: {
            //price:{}, // {min:'100', max:''200}
            options:{}
        }, page, sort, count
        //sort:{} //{sortName:'price', sortType:'desc'}
        //count:10

    }

    //Смотрим бренд если не передан
    if(typeof brand_id === "undefined"){
        let brands = document.querySelectorAll('[data-filter="brand_id"] .active');
        if(brands.length) data.products["brand_id"] = Array.from(brands).map(el => el.dataset.id);
    } else {
        data.products.brand_id = brand_id
    }


    //Смотрим остальные параметры
    if(isJsonOptions) {
        let json_option = document.querySelectorAll('[data-option-filter="json_option"]')
        json_option.forEach(j_el => {
            let activeOptions = j_el.querySelectorAll('.active');
            activeOptions.length && (data.options.options[j_el.dataset.filter] = Array.from(activeOptions).map(opt => opt.dataset.id));
        })
    } else {
        delete data.options.options
    }

    console.log('function creationJSON', data)
    //TODO смотрим цену

    return data
}

// Парсит параметры из подборщика на главной странице
function checkJSON() {
    let data = localStorage.getItem('product_parameters_complete')
    if(data){
        data = JSON.parse(data)
        delete data.params
        data.page = '1';

        const optionPanel = this.header.optionPanel;

        this.header.category_id = +data.products.category_id;
        this.header.$el.querySelector('.category-header.active').classList.remove('active');
        this.header.$el.querySelector(`[data-cat="${this.header.category_id}"]`).classList.add('active');

        changeCategory.call(this).then(() => {
            activeOptions(optionPanel, data);
            this.catalog.send(JSON.stringify(data),this.token)
            localStorage.removeItem('product_parameters_complete')
        });
    }
}

// Активирует опции каталога, из подборщика на главной странице
function activeOptions(el, data) {

    // Если есть бренды
    if (data.products.brand_id) {
        const labelBrand = el.querySelector('[data-filter="brand_id"] [data-type="value"]');
        const brandsSet = el.querySelectorAll('[data-filter="brand_id"] [data-id]');
        const brands = data.products.brand_id;
        const values = [];
        brandsSet.forEach(brand => {
            if (brands.includes(brand.dataset.id)) {
                brand.classList.add('active');
                values.push(brand.textContent);
            }
        });
        labelBrand.textContent = values.join(', ');
    }

    const options = Object.keys(data.options.options);  // Ключи опций

    // Если опции есть
    if (options.length) {
        options.map(name => {
            const labelSelected = el.querySelector(`[data-filter=${name}] [data-type="value"]`); // label селекта
            const select = el.querySelectorAll(`[data-filter="${name}"] [data-id]`);    // Набор опций селекта
            const values = data.options.options[name];                                  // Значения опций из подборщика
            if (name !== 'season' && name !== 'heavy') labelSelected.textContent = values.join(', ');   // Вывод значений в селекты
            select.forEach(option => {
                if (values.includes(option.dataset.id)) {
                    option.classList.add('active');
                }
            })

        })
    }

}
