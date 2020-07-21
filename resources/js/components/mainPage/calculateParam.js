import {Component} from "@core/component";
import {MainChoiceMenuComponent} from "./mainChoiceMenu";
import {MainChoiceListComponent} from "./mainChoiceList";
import Server from "@core/servers";


export class CalculateParamComponent extends Component{
    constructor(id){
        super(id)
    }

    init(){
        this.token = this.$el.querySelector('[name="_token"]').value
        this.server = new Server()
        this.choiceMenu = new MainChoiceMenuComponent('choice-menu');
        this.choiceList = new MainChoiceListComponent('content-choice');
        this.pick = this.$el.querySelector('.pick')
        this.clear = this.$el.querySelector('.clear')

        /*Подписка на событие смены категории*/
        this.choiceMenu.$el.addEventListener('change-category',()=>{
            this.choiceList.change(this.token,this.choiceMenu.category_id)
            this.clearParams();
        })
        /*Подписка на событие смены параметра поиска*/
        this.choiceList.$el.addEventListener('click-param',async ()=>{
            let activeElements = document.querySelectorAll('[data-id].active').length;
            this.pick.disabled = true;
            this.clear.disabled = true;
            await this.server.post('praramlist',jsonRequestDate.call(this),{'Content-Type': 'application/json;charset=utf-8',},this.token).then(answer => {
                this.render(answer)
                this.pick.disabled = activeElements === 0;
                this.clear.disabled = activeElements === 0;
                if(activeElements === 0) this.pick.innerHTML = 'Выберите параметр';
            })
        })

        /* кнопка подобрать */
        this.pick.addEventListener('click',() => {
            localStorage.setItem('product_parameters_complete', localStorage.getItem('product_parameters'));
            localStorage.removeItem('product_parameters');
            document.location.href = "/catalog";
        })
        /* отчистка параметров */
        this.clear.addEventListener('click', this.clearParams.bind(this))


    }

    clearParams() {
        localStorage.removeItem('product_parameters');
        localStorage.removeItem('product_parameters_complete');
        document.querySelectorAll(".content-choice .active").forEach(el => {el.classList.remove("active")});
        this.choiceList.$el.dispatchEvent(this.choiceList.event)
    }

    render(data){
        if(data.count) {
            this.pick.innerHTML = 'Показать ' + data.count + ' моделей';
            for (let el in data.param) {
                let params = data.param[el];
                params = params.map(el2 => `<li data-id="${el2.brand_id ? el2.brand_id : el2}">${el2.brand_name ? el2.brand_name : el2}</li>`).join('')
                this.choiceList.$el.querySelector(`[data-filter=${el}]`).innerHTML = params;
            }
        }
    }
}

/*формируется объект для отправки на сервер*/
function jsonRequestDate(){
    let data = {
        base_option: { category_id: this.choiceMenu.category_id},
        json_option: {},
        params: {}
    }

    let brand_id = document.querySelector('[data-filter="brand_id"] .active')
    if(brand_id) data.base_option["brand_id"] = brand_id.dataset.id;

    let json_option = document.querySelectorAll('[data-option-filter="json_option"]')
    json_option.forEach(j_el => {
        let activeOptions = j_el.querySelectorAll('.active');
        if(activeOptions.length){
            let mass = []
            activeOptions.forEach(opt => {mass.push(opt.dataset.id)})
            data.json_option[j_el.dataset.filter] = mass;
        }
    })

    let params = this.choiceList.$el.querySelectorAll('.choice-list [data-filter]')
    let massParams = [];
    params.forEach(el => {
        massParams.push(el.dataset.filter)
    })
    data.params = massParams;

    data = JSON.stringify(data)
    //console.log(data)
    localStorage.setItem('product_parameters', data);
    return data;
}