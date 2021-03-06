import {Component} from "@core/component";
import Server from '@core/servers';


export class SearchComponent extends Component{
    constructor(id){

        super(id)

    }
    init(){
        this.categoryName = document.querySelector('[data-category-name].active') ? document.querySelector('[data-category-name].active').dataset.categoryName : '';
        //this.url = 'imperia_admin_panel/'+this.$el.dataset.href+this.categoryName;
        this.url = this.categoryName ? `imperia_admin_panel/${this.$el.dataset.href}/${this.categoryName}` : `imperia_admin_panel/${this.$el.dataset.href}`;
        this.token = this.$el.dataset.token
        this.server = new Server('/');
        this.event = new Event('search',{bubbles: false, cancelable: false});
        this.page = 1;
        this.answer = '';
        this.sortType = 'updated_at';
        this.sort = 'desc';
        this.$el.addEventListener('input', inputHandler.bind(this));
    }
    search(){
        sendRequest.call(this);
    }

}


function  inputHandler(e) {
    e.preventDefault();
    this.page = 1;
    sendRequest.call(this)
}


function sendRequest(){
    let data = {
        'search': this.$el.value,
        'page': this.page,
        'sort': this.sort,
        'sort_type': this.sortType
    }

    console.log('data', data)

    this.server.get(this.url, data,{}, this.token).then(answer => {
        console.log('answer', answer)
        this.answer = answer;
        this.$el.dispatchEvent(this.event)
    });
}
