import {Component} from "../../core/component";
import Server from "../../core/servers";

export class PaginationComponent extends Component{
    constructor(id){

        super(id)
        this.page = 1;

    }
    init(){
        this.event = new Event('paginate',{bubbles: false, cancelable: false});

        this.$el.addEventListener('click', (e)=> {

            if(e.target.closest('.paginate-item') && !e.target.classList.contains('active')){
                this.$el.querySelector('.paginate-item.active').classList.remove('active')
                e.target.classList.add('active')
                this.page = e.target.dataset.page
                this.$el.dispatchEvent(this.event)
            }
        })
    }

    render(currentPage,lastPage){
        let html = ''
        if(lastPage > 1) {
            for(let i = 1; i<=lastPage; i++){
                html += `<div data-page="${i}" class="${i === currentPage && 'active'} paginate-item ">${i}</div>`;
            }
        }

        this.$el.innerHTML = html;
    }


}

/*$('.paginate').on('click','.paginate-item',function (e) {
        let $element = $(this);
        if(!$element.hasClass('active')){
            $('.paginate-item.active').removeClass('active');
            $element.addClass('active');
            $search.trigger('input');
        }
    });*/
