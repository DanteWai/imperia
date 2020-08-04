import {Component} from "@core/component";
import {PaginationComponent} from "./pagination";
import {SearchComponent} from "./search";
import {SortComponent} from "./sort";
import {ListRenderComponent as list} from "./listRender";

//import route from './../../route';



export class ListComponent extends Component{
    constructor(id){
        super(id)

    }


    init(){

        this.search = new SearchComponent('search')
        this.pagination = new PaginationComponent('paginate')
        this.sort = new SortComponent('sort')
        //this.body = this.$el.querySelector('.elements-body')
        this.body = this.$el.querySelector('tbody')


        this.search.$el.addEventListener('search',()=>{
            this.render(this.search.answer.data)
            this.pagination.render(this.search.answer.current_page, this.search.answer.last_page)
        })

        this.pagination.$el.addEventListener('paginate',()=>{
            this.search.page = this.pagination.page
            this.search.search();
        })

        if(this.sort.$el)
        this.sort.$el.addEventListener('sort',()=>{
            this.search.sort = this.sort.sort
            this.search.sortType = this.sort.sortType
            this.search.search();
        })

        this.$el.addEventListener('click', deleteElement.bind(this))

    }

    render(data){
        this.body.innerHTML = list.listHtml(this.$el.dataset.list,data);
    }
}

function deleteElement(e) {
    let a = e.target.closest('.delete-element');
    if(a) {
        e.preventDefault();
        let result = confirm('Вы уверены что хотите удалить запись?');

        if (result) {
            this.search.server.delete(a.href,{}, this.search.token).then(answer=>{
                this.search.search();
            });
        }
    }
}

