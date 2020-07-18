import {Component} from "@core/component";
import Server from "@core/servers";


export class OrderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {

        this.server = new Server();
        this.token = document.querySelector('[name="_token"]').value

        this.form = document.getElementById('order-form')

        this.phone = document.getElementById('phone')
        this.message = this.$el.querySelector('.message')

        this.delivery = document.getElementById('delivery')
        this.pickup = document.getElementById('pickup')
        this.complete = document.getElementById('complete')

        this.adr = document.getElementById('adr')

        this.form.addEventListener('submit',formHandler.bind(this))
        this.phone.addEventListener('blur',ValidPhone.bind(this))
        this.delivery.addEventListener('click',ValidDelivery.bind(this))
        this.pickup.addEventListener('click',ValidDPickup.bind(this))
        this.adr.addEventListener('input',()=>{
            this.complete.disabled = this.adr.value === ''
        })

    }
}

function formHandler(e) {
    e.preventDefault()

    let payments = document.getElementsByName("payment")
    for(let i = 0; i < payments.length; i ++){
        if(payments[i].checked) payments[i].disabled = false
    }


    let object = {}
    let data = new FormData(this.form)
    data.forEach(function(value, key){
        object[key] = value;
    });
    object.price = priceCalculation.call(this)


    object.basket = JSON.parse(localStorage.getItem('basket'))

    data = JSON.stringify(object)



    if(ValidPhone.call(this)){
        this.server.post('catalog/checkout', data, {'Content-Type': 'application/json;charset=utf-8'}, this.token).then(answer => {
            if(answer.status !== undefined){
                let testbox = document.querySelector('#order')
                testbox.innerHTML = `<h1>${answer.status}</h1>`

            }
        })
    }
}

function priceCalculation(){

    let prices = document.querySelectorAll('.basket-list-body-price')
    //TODO вещественные
    return Array.from(prices).reduce((sum,el) =>{
        return sum + parseInt(el.innerHTML)
    },0)
}
/**
 * @return {boolean}
 */
function ValidPhone() {
    let re = /^\d[\d\(\)\ -]{4,14}\d$/;

    let output = ''
    let res = re.test(this.phone.value)
    if (re.test(this.phone.value)){
        output = 'Номер телефона введен правильно!'
        this.message.style.color = 'green'
    } else {
        output = 'Номер телефона введен неправильно!'
        this.message.style.color = '#cc0303'
    }

    this.message.innerHTML = output
    return res;
}
function ValidDelivery(){
    if(this.delivery.checked){
        this.adr.disabled = false
        document.getElementById('delivery_p').checked = true
    }
}
function ValidDPickup(){
    document.getElementById('delivery_p').checked = false
    this.adr.disabled = true
    this.adr.value = ''
    this.complete.disabled = false
    document.getElementById('pickup_p').checked = true
    document.getElementById('pickup_p').checked = true
}






