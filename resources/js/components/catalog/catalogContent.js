//Главный компонент отображения каталога
import {Component} from "@core/component";
import {CatalogHeaderComponent} from "./catalogHeader";
import {CatalogProductsComponent} from "./catalogProducts";
import Server from "@core/servers";
import {LoaderComponent} from "@js/components/all/loader";
import {FilterComponent} from './../all/filter';


export class CatalogContentComponent extends Component {
    constructor(id, {basket}) {
        super(id, false)
        this.basket = basket;
        this.loader = new LoaderComponent();
        this.$el && this.init();
    }

    init(){
        this.header = new CatalogHeaderComponent('header')
        this.catalog = new CatalogProductsComponent('product-list');
        //this.filter = new FilterComponent('filter-panel');
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
        //показ корзины
        this.catalog.$el.addEventListener('showBasket', changeBasket.bind(this));
        // показ фильтра
        //this.$el.addEventListener('showFilter', showFilter.bind(this));


        checkJSON.call(this)
    }

}

/*function showFilter(e) { на удаление
    console.log('filter', this.filter);
    this.filter.collapse();
}*/

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
        this.header.optionPanel.innerHTML = answer.option_panel //смена доступных для товара опций
        this.catalog.$el.innerHTML = answer.list //?
        this.loader.unmount(this.catalog.$el);
    }
}
//События клика по карточке бренда
function clickBrand(e){
    let target = e.target.closest('.category-item')
    if(target){
        const brand = this.header.optionPanel.querySelector(`[data-filter="brand_id"] [data-id="${target.dataset.brand}"]`);
        brand.classList.add('active');
        brand.selected = true;
        let data = creationJSON.call(this,{brand_id:target.dataset.brand, isJsonOptions:false, page:1})
        this.catalog.send(JSON.stringify(data),this.token)
    }
}
//Событие смена параметра товара
function changeParam(e){
    console.log(e);
    let data = creationJSON.call(this, {page:e.detail})
    this.catalog.send(JSON.stringify(data),this.token)
}
//Формирует json для отправки на сервер
function creationJSON({page =1, isJsonOptions = true, brand_id}){
    let data = {
        products: { category_id: this.header.category_id, },
        options: {
            //price:{},
            options:{}
        }, page
    }

    //Смотрим бренд если не передан
    if(typeof brand_id === "undefined"){
        let brand_id = document.querySelector('[data-filter="brand_id"] .active');
        if(brand_id) data.products["brand_id"] = brand_id.dataset.id;
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


    //TODO смотрим цену

    return data
}

// Парсит параметры из подборщика на главной странице
function checkJSON() {
    let data = localStorage.getItem('product_parameters_complete')
    if(data){
        data = JSON.parse(data)
        delete data.params
        data.page = '1'
        this.catalog.send(JSON.stringify(data),this.token)
        localStorage.removeItem('product_parameters_complete')
    }
}
