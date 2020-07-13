import {Component} from "@core/component";
import Server from "@core/servers";



export class MainChoiceListComponent extends Component{
    constructor(id){
        super(id)
        this.height = this.$el.offsetHeight;
        this.server = new Server()
        this.event = new Event('click-param')
    }


    init(){


        //this.$el.addEventListener('click', activeLi)
        this.$el.addEventListener('click', dataId.bind(this))

    }

    async change(token, category_id){
        let answer = await this.server.post('newPraramlist',{category_id},{},token)
        if(!answer.status){
            await myLoop(this.$el.children, 0, "run");
            this.$el.style.opacity = 0;
            this.$el.innerHTML = answer;
            for(let i = 0; i < this.$el.children.length;i++){
                this.$el.children[i].classList.add('run')
            }
            jQuery('.scrollbar-inner').scrollbar();
            this.$el.style.opacity = "";
            myLoop(this.$el.children, 0, "run");
        }
    }


}

function myLoop(elements, count, toggle) {
    return new Promise((resolve, reject)=>{
        let timerId = setInterval(function () {
            if (count < elements.length) {
                elements[count].classList.toggle(toggle);
                count++;

            } else {
                clearInterval(timerId)
                resolve()
            }
        }, 100)
    })

}



function dataId(e){
    let el = e.target.closest('[data-id]');
    if(el) {
        el.classList.toggle('active')
        this.$el.dispatchEvent(this.event)
    }
}


