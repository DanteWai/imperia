import {Component} from "@core/component";
import Modal from '@core/modal';
import Server from "@core/servers";

export class OrdersComponents extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.server = new Server();
        this.token = document.querySelector('[name="_token"]').value;
        this.fullOrderLink = document.querySelectorAll('.full-order')
        this.fullOrderLink.forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                const target = e.target;
                const id = target.dataset.id;
                console.log('clck')
                // TODO тут рамс
                this.server.get(`orders/${id}`, {}, {'Content-Type': 'application/json;charset=utf-8'}, this.token).then(answer => {
                    console.log('answer', answer);
                });
            })
        })
    }
}
