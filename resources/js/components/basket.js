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
        this.icon = this.$el.querySelector('.basket-icon');
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
        this.$el.classList.toggle('small');
        this.$el.classList.toggle('big');
        const icon = (this.$el.classList.contains('big')) ? 'x' : 'basket';

        tr.innerHTML = `<use xlink:href="/public/images/sprite.svg#${icon}"></use>`;
    }
}
export function deleteElement(e){
    let tr = e.target.closest('.basket-list-body-delete') || e.target.closest('.remove-basket');
    if(tr){
        const optionId = tr.dataset.optionId ? tr.dataset.optionId : tr.parentElement.dataset.optionId;
        let parent = this.$el.querySelector(`li[data-option-id="${optionId}"]`);
        let json = JSON.parse(this.json)
        delete json[parent.dataset.optionId]

        // Меняем надпись у кнопки в карточке товара КАТАЛОГА
        const button = document.querySelector(`.add-basket[data-option-id="${parent.dataset.optionId}"]`);
        const input = button ? button.previousElementSibling : null;

        if (button) {
            button.disabled = false;
            button.querySelector('span').textContent = 'Добавить в корзину';
            input.classList.remove('hide');
        }

        // Скрываем кнопку "удалить" на странице товара
        const removeButton = document.querySelector('.remove-basket');
        const countLabel = document.querySelector('.basket-count');
        const addButton = document.querySelector('.add-basket');

        if (removeButton && countLabel) {
            removeButton.classList.add('hide');
            countLabel.classList.remove('hide');
            addButton.innerHTML = `
            <svg class="basket-icon">
                <use xlink:href="/public/images/sprite.svg#basket"></use>
            </svg>
            <span>Добавить в корзину</span>
            `;
        }

        localStorage.setItem('basket',JSON.stringify(json))
        this.json = JSON.stringify(json);
        parent.remove()

        // Если корзина пустая - скрыть ее
        if (!Object.keys(JSON.parse(this.json)).length) {
            localStorage.removeItem('basket');
            this.$el.classList.add('small');
            this.$el.classList.remove('big');
            this.icon.innerHTML = `<use xlink:href="/public/images/sprite.svg#basket"></use>`;
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
        let value = Math.floor(Number(target.value));

        value = Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1) , 10) //Проверка на nan и на диапазон

        json[parent.dataset.optionId] = target.value = value;
        this.json = JSON.stringify(json);
        localStorage.setItem('basket',this.json);
        priceElement.textContent = +priceElement.dataset.productPrice * value;
    }
}
