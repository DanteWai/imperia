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

        this.json && this.fill();       //выполнить fill если есть json

        this.$el.addEventListener('click',collapse.bind(this))
        this.$el.addEventListener('click',deleteElement.bind(this))
        this.$el.addEventListener('change', changeCount.bind(this));
    }

    async fill() {
        let answer = await this.server.post('catalog/basket', this.json, {'Content-Type': 'application/json;charset=utf-8'}, this.token)
        //console.log(answer)
        this.count = answer.length
        this.countRender()
        this.show()

        this.body.innerHTML = answer.map(el => {

            const linkName = el.model.toLowerCase().replace(/ /g, '_').replace(/[.]/g, '');

            return `
            <li data-option-id="${el.option_id}">
                <img src="/images/test/koleso.png" alt="">
                <div class="basket-list-body">
                <a href="catalog/${linkName}/${el.option_id}" class="basket-list-body-name">
                    ${el.brand} ${el.model}
                </a>
                <p class="basket-list-body-param">Параметры товара</p>
                </div>
                <input class="product-count" type="text" value="${el.count}">
                <span class="basket-list-body-count">шт</span>
                <span data-product-price="${el.price}" class="basket-list-body-price">${el.price * el.count}</span>
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

        const button = document.querySelector(`.add-basket[data-option-id="${parent.dataset.optionId}"]`);

        if (button) {
            button.disabled = false;
            button.querySelector('span').textContent = 'Добавить в корзину';
        }

        localStorage.setItem('basket',JSON.stringify(json))
        this.json = JSON.stringify(json);
        parent.remove()

        // Если корзина пустая - скрыть ее
        if (!Object.keys(JSON.parse(this.json)).length) {
            localStorage.removeItem('basket');
            this.$el.classList.add('small');
            this.$el.classList.remove('big');
            this.body.innerHTML = '<li class="basket-empty">Пока товаров нет</li>';
            this.hide();
        }

        this.count = this.count -1
        this.countRender()
    }
}

// Пересчет корзины
function changeCount(e) {
    const target = e.target.closest('.product-count');

    if (target) {
        const parent = target.parentElement;
        const priceElement = parent.querySelector('.basket-list-body-price');
        let json = JSON.parse(this.json);

        let value = Number.parseInt(Number(target.value));

        if (Number.isNaN(value) || value < 1) {
            target.value = 1;
            value = 1;
        } else target.value = Math.floor(target.value);

        json[parent.dataset.optionId] = target.value;
        json = JSON.stringify(json);
        localStorage.setItem('basket',json);
        this.json = json;
        priceElement.textContent = +priceElement.dataset.productPrice * value;
    }
}