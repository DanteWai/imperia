import {Component} from "@core/component";

export class MainChoiceMenuComponent extends Component{
    constructor(id){
        super(id)
        this.event = new Event('change-category');
        this.category_id = 1;
    }

    init(){
        let elements = this.$el.querySelectorAll('.category-header');
        elements.forEach(el => { el.addEventListener('click',changeTabs.bind(this))})
    }

}
export function changeTabs(e){
    let target = e.target.closest('.category-header')
    if(target){

        if(!target.classList.contains('active')){
            this.$el.querySelector('.active').classList.remove('active')
            target.classList.add('active')
            this.category_id = target.dataset.cat;
            this.$el.dispatchEvent(this.event)
        }
    }
}



