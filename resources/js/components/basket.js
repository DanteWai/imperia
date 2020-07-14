import {Component} from "@core/component";
import Server from "@core/servers";

export class BasketComponent extends Component {
    constructor(id) {
        super(id)
    }

    init(){

        this.server = new Server();
        this.token = document.querySelector('[name="_token"]').value
        this.json = localStorage.getItem('basket')
        this.body = this.$el.querySelector('.basket-list')
        this.count = 0;
        this.$count = this.$el.querySelector('.basket-count-p')

        Object.keys(JSON.parse(this.json)).length && this.fill() //выполнить fill если есть json

        this.$el.addEventListener('click',collapse.bind(this))
        this.$el.addEventListener('click',deleteElement.bind(this))
    }

    async fill() {
        let answer = await this.server.post('catalog/basket', this.json, {'Content-Type': 'application/json;charset=utf-8'}, this.token)
        //console.log(answer)
        this.count = answer.length
        this.countRender()
        this.show()



        this.body.innerHTML = answer.map(el => {


            return `
            <li data-option-id="${el.option_id}">
                <img src="/images/test/koleso.png" alt="">
                <div class="basket-list-body">
                <a href="" class="basket-list-body-name">
                    ${el.brand} ${el.model}
                </a>
                <p class="basket-list-body-param">Параметры товара</p>
                </div>
                <input type="text" value="${el.count}">
                <span class="basket-list-body-count">шт</span>
                <span data-product-price="4700" class="basket-list-body-price">${el.price * el.count}</span>
                <span class="basket-list-body-delete">Удалить</span>
            </li>
            `
        }).join('')

    }

    countRender(){
        this.$count.innerHTML = this.count;
    }
}

///catalog/basket

function collapse(e){
    let tr = e.target.closest('.basket-icon')
    if(tr){
        this.$el.classList.toggle('small')
        this.$el.classList.toggle('big')
    }
}
function deleteElement(e){
    let tr = e.target.closest('.basket-list-body-delete')
    if(tr){
        let parent = tr.parentElement
        let json = JSON.parse(this.json)
        delete json[parent.dataset.optionId]
        localStorage.setItem('basket',JSON.stringify(json))
        this.json = JSON.stringify(json);
        parent.remove()

        // Если корзина пустая - скрыть ее
        if (!Object.keys(JSON.parse(this.json)).length) {
            this.$el.classList.remove('big');
            this.hide();
        }

        this.count = this.count -1
        this.countRender()
    }
}