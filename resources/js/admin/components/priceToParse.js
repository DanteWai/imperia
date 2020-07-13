import {Component} from "@core/component";
import Server from "@core/servers";


export class PriceToParse extends Component{
    constructor(id) {
        super(id);
    }
    init(){
        this.server = new Server();
        this.token = document.querySelector('[name="_token"]').value
        let $elements = this.$el.querySelectorAll('tr')
        this.save = document.getElementById('save')
        elementsCalculate.call(this,$elements)

        this.save.addEventListener('click',saveEl.bind(this))
        //console.log($elements)
    }
}
async function saveEl(){

    let successElement = document.querySelectorAll('.success')


    let elements = successElement
    let old = elements
    elements = Array.from(elements)

    elements = elements.map(el =>{
        let children = el.children
        return {
            'category_id':1, /*TODO хардкод*/
            'brand':children[0].innerHTML.trim(),
            'product_model':children[1].innerHTML.trim(),
            'opt_json_width':children[2].innerHTML.trim(),
            'opt_json_height':children[3].innerHTML.trim(),
            'opt_json_diameter':children[4].innerHTML.trim(),
            'opt_json_index':children[5].innerHTML.trim(),
            'price':children[9].innerHTML.trim(),

            'parser_name':document.getElementById('parser_name').value
        }

    })

    console.log(elements)

    for(let i = 0; i < elements.length;i++){
        let data = JSON.stringify(elements[i])

        let answer = await this.server.post('imperia_admin_panel/price_lists/add_product', data, {'Content-Type': 'application/json;charset=utf-8'}, this.token)
        console.log(answer)

    }
    window.location = "/imperia_admin_panel/price_lists";
}

async function elementsCalculate(elements){

    let old = elements
    elements = Array.from(elements)
    elements.shift()
    elements = elements.map(el =>{
        let children = el.children
        return {
            'brand':children[0].innerHTML.trim(),
            'model':children[1].innerHTML.trim(),
            'width':children[2].innerHTML.trim(),
            'height':children[3].innerHTML.trim(),
            'diameter':children[4].innerHTML.trim(),
            'index':children[5].innerHTML.trim(),
        }

    })

    //console.log(old[0].style.color='red')
    //console.log(elements)

    for(let i = 0; i < elements.length;i++){
        let data = JSON.stringify(elements[i])

        let answer = await this.server.post('imperia_admin_panel/price_lists/parse', data, {'Content-Type': 'application/json;charset=utf-8'}, this.token)


        if(answer.price){
            old[i+1].classList.add('success')
            old[i+1].lastElementChild.innerHTML = answer.price
            old[i+1].style.color = 'green'
        } else{
            old[i+1].lastElementChild.innerHTML = answer.error
            old[i+1].style.color = 'red'
        }
    }


    this.save.classList.add('bg-success')
    this.save.disabled = false

///
}
