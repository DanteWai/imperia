import {Component} from "@core/component";
import Modal from '@core/modal';
import Server from "@core/servers";

export class OrdersComponents extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.server = new Server('admin');
        this.modal = false
        this.token = document.querySelector('[name="_token"]').value;
        this.fullOrderLink = document.querySelectorAll('.full-order')
        this.fullOrderLink.forEach(el => {
            el.addEventListener('click', linkHandler.bind(this))
        })
    }
}

function linkHandler(e) {
    e.preventDefault();
    const target = e.target;
    const id = target.dataset.id;
    this.server.get(`orders/${id}`, {'Content-Type': 'application/json;charset=utf-8'}, this.token).then(answer => {
        console.log('answer', answer);

        const title = `Заказ № ${answer.order_id} от ${new Date(answer.created_at).toLocaleDateString('ru-RU')}`
        const content = `
                <div class="modal-order">
                    <div class="modal-order-title">
                        <span>Заказчик:</span>
                        <span>Телефон:</span>
                        <span>Электронная почта:</span>
                        <span>Способ доставки:</span>
                        <span>Способ оплаты:</span>
                    </div>
                    <div class="modal-order-info">
                        <span>${answer.options.name}</span>
                        <span>${answer.options.phone}</span>
                        <span>${answer.options.email}</span>
                        <span>${answer.options.getting}</span>
                        <span>${answer.options.payment}</span>
                    </div>
                </div>
                <table class="table-elements">
                    <thead>
                        <tr>
                            <td>№</td>
                            <td>Название</td>
                            <td>Количество</td>
                            <td>Цена</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${answer.basket.map((item, i) => {
            return `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${item.full_name}</td>
                                    <td>${item.count_basket}</td>
                                    <td>${item.price}</td>
                                </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
                <div class="modal-price-block">
                    <span>Общая стоимость заказа: <span class="modal-price">${answer.price} P</span></span>
                </div>
            `


        if(!this.modal){
            this.modal = new Modal({
                showHeader: true,
                title,
                width: '60%',
                closable: true,
                footerButtons: [
                    {
                        text: 'Подтвердить',
                        type: 'bg-success',
                        handler: () => {
                            this.modal.close()
                        }
                    },
                    {
                        text: 'Отменить',
                        type: 'bg-danger',
                        handler: () => {
                            this.modal.close()
                        }
                    },
                    {
                        text: 'Закрыть',
                        type: 'bg-basic',
                        handler: () => {
                            this.modal.close()
                        }
                    }
                ],
                content
            });
        } else{
            this.modal.setTitle(title)
            this.modal.setContent(content)
        }

        this.modal.open()
    });

}
