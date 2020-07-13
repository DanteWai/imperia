export class Component {
    constructor(id, initial = true){
        this.$el = document.getElementById(id);
        if (this.$el && initial) this.init();

    }
    init(){}

    hide(){
        this.$el.classList.add('hide');
    }
    show(){
        this.$el.classList.remove('hide');
    }
}
