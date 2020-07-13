export class Component {
    constructor(id){
        this.$el = document.getElementById(id);
        if(this.$el) this.init();

    }
    init(){}

    hide(){
        this.$el.classList.add('hide');
    }
    show(){
        this.$el.classList.remove('hide');
    }
}
