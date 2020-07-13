import {Component} from "@core/component";
import Server from "@core/servers";

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
    }

    send(json, token){
        this.json = json;
        this.server.post('catalog/list',json,{'Content-Type': 'application/json;charset=utf-8'},token).then(answer =>{
            //console.log(answer)
            if(answer.products){
                this.$el.innerHTML = answer.products
            }

        })
    }
}

function addBasket(e){
    let el = e.target.closest('.add-basket');
    if(el){
        el.disabled = true
        el.innerHTML = "<span>Товар в корзине</span>"
        addBasketJson(el.dataset.optionId , el.previousElementSibling.value)
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

