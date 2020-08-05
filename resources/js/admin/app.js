import '@scss/admin/adminStyle.scss';
import "regenerator-runtime/runtime";
import Server from './servers';
import Tabs from './tabs';
import {PriceToParse} from "./components/priceToParse"; //временный компонент
import {OrdersComponents} from "@js/admin/components/mainPage/ordersComponent";
import {ListComponent} from './components/list';

//import Lang from './../lang';
//console.log(route('productPage',['3','6'],[4]))
//console.log(Lang.get('auth.failed',{email:'email'}))
//Lang.setLocale('ru')
//Lang.has('auth.failed')
//Lang.choice('auth.failed',10,{email:'email'})

window.addEventListener('load',() => {

    new OrdersComponents('main-orders-component')

    new ListComponent('page-list2');
    new ListComponent('page-list3');

    new PriceToParse('parse')
    new Tabs({parent:'.tabs-contaiter'})
    let server = new Server();


    // Вешаем на файловые инпуты обработку текста
    let files = document.querySelectorAll('.inputFile')
    for(let el of files){
        el.addEventListener('change', (e) =>{
            let that = e.target
            that.nextElementSibling.innerHTML = that.value.substr(that.value.lastIndexOf("\\")+1,that.length);
        })
    }

    // смена категории во время добавления товара
    let category_selector =document.querySelector('.category_selector')
    category_selector && category_selector.addEventListener('change', async function () {
        let answer  = await server.get(this.dataset.href + '?id=' + this.value,{
            'X-CSRF-TOKEN':document.querySelector('input[name="_token"]'.value),
            "X-Requested-With": "XMLHttpRequest",
        })
        answer.html && (document.querySelector('.product-options').innerHTML = answer.html)
    })
});


