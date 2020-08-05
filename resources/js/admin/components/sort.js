import {Component} from "@core/component";


export class SortComponent extends Component{
    constructor(id){

        super(id)
        this.sortType = 'updated_at';
        this.sort = 'desc';

    }
    init(){
        this.event = new Event('sort',{bubbles: false, cancelable: false});

        this.$el.addEventListener('click', (e)=> {
            let button = e.target

            if(button.closest('button')){
                if(!button.classList.contains('bg-basic-outline')){
                    let old = this.$el.querySelector('.bg-basic-outline');
                    if(old) old.classList.remove('bg-basic-outline','asc','desc')
                    button.classList.add('bg-basic-outline','asc')
                }
                else{
                    button.classList.toggle('asc');
                    button.classList.toggle('desc');
                }

                this.sortType = button.dataset.search;
                this.sort = button.classList.contains('asc') ? 'asc' : 'desc';
                this.$el.dispatchEvent(this.event)
            }

        })
    }




}

/*
let $filterButtons = $('.filters button');
$filterButtons.on('click',function (e) {

    $filterButtons.not(this).removeClass('bg-basic-outline asc desc');
    let $this = $(this);
    let sort = 'asc';

    if($this.hasClass('bg-basic-outline')){
        $this.toggleClass('asc');
        $this.toggleClass('desc');
    } else{
        $this.addClass('bg-basic-outline asc');

    }

    $this.hasClass('asc') ? sort = 'asc' :sort = 'desc';


    server.get(this.dataset.href + '?search=' + this.dataset.search + '&sort=' + sort,{
        'X-CSRF-TOKEN':$token,
        "X-Requested-With": "XMLHttpRequest",
    }).then(answer=>{
        console.log(answer);
        let out = 'group-brands';
        OutHtml(answer, out);
    });
})

 */
