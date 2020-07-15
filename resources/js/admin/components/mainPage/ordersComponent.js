import {Component} from "@core/component";

export class OrdersComponents extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        this.fullOrderLink = document.querySelectorAll('.full-order')
        this.fullOrderLink.forEach(el => {
            el.addEventListener('click', function (e) {
                e.preventDefault()
                console.log('clck')
            })
        })
    }
}
