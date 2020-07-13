import {Component} from "@core/component";
import {CatalogHeaderComponent} from "./catalogHeader";
import {CatalogProductsComponent} from "./catalogProducts";
import Server from "@core/servers";


export class CatalogContentComponent extends Component {
    constructor(id, basket) {
        super(id, false)
        this.basket = basket
        this.init()
    }

    init(){
        this.header = new CatalogHeaderComponent('header')
        this.catalog = new CatalogProductsComponent('product-list')
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

        this.catalog.$el.addEventListener('showBasket', () => {
            this.basket.show()
        })


        checkJSON.call(this)
    }

}

function changeCategory(){
    this.server.post('catalog/switch',{category_id:this.header.category_id},{},this.token).then(answer => {
        if(answer.option_panel && answer.list){
            this.header.optionPanel.innerHTML = answer.option_panel;
            this.catalog.$el.innerHTML = answer.list
        }

    })
}
function clickBrand(e){
    let target = e.target.closest('.category-item')
    if(target){
        let data = {
            base_option: {
                category_id: this.header.category_id,
                brand_id: target.dataset.brand
            }, json_option: false, page:1
        }
        this.catalog.send(JSON.stringify(data),this.token)
    }
}
function changeParam(e){
    let data = {
        base_option: {
            category_id: this.header.category_id,
        }, json_option: {},
        page:e.detail
    }

    let json_option = document.querySelectorAll('[data-option-filter="json_option"]')
    json_option.forEach(j_el => {
        let activeOptions = j_el.querySelectorAll('.active');
        if(activeOptions.length){
            let mass = []
            activeOptions.forEach(opt => {mass.push(opt.dataset.id)})
            data.json_option[j_el.dataset.filter] = mass;
        }
    })
    console.log(data)
    //console.log(data)
    this.catalog.send(JSON.stringify(data),this.token)
}

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
