import {Component} from "@core/component";
import {changeTabs} from "../mainPage/mainChoiceMenu";

export class CatalogHeaderComponent extends Component {
    constructor(id) {
        super(id)
        this.event = new Event('change-category');
        this.category_id = 1;
    }

    init(){
        this.menu = this.$el.querySelectorAll('.category-header')
        for(let el of this.menu) {  el.addEventListener('click', changeTabs.bind(this)) }


        this.optionPanel = this.$el.querySelector('.options-panel')
        this.optionPanel.addEventListener('click', dataId.bind(this))


    }

}

function dataId(e){

    let el = e.target.closest('[data-id]');
    if(el){
        if(el.tagName === 'INPUT') el.classList.toggle('active')
        this.$el.dispatchEvent(new CustomEvent('change-param',{page:"1"}))
    }

}


/*
//let index = e.target.selectedIndex;     // для хрома
    //let el = index ? e.target[index] : e.target.closest('[data-id]');

let select = el.closest('SELECT')
        if(select){
            let activeInSelect = select.querySelectorAll('.active')
            if(activeInSelect){
                for(let act of activeInSelect){
                    act.classList.remove('active')
                }
            }

        }
        el.classList.toggle('active')*/

