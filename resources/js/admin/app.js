import '@scss/admin/adminStyle.scss';
import "regenerator-runtime/runtime";
import Server from '@core/servers';
import Tabs from './tabs';
import Spoiler from "@core/spoiler";
import {OrdersComponents} from "@js/admin/components/mainPage/ordersComponent";
import {BrandsParseComponent} from './components/mainPage/brandsParseComponent';
import {ListComponent} from './components/list';

//import Lang from './../lang';
//console.log(route('productPage',['3','6'],[4]))
//console.log(Lang.get('auth.failed',{email:'email'}))
//Lang.setLocale('ru')
//Lang.has('auth.failed')
//Lang.choice('auth.failed',10,{email:'email'})

window.addEventListener('load',() => {

    new OrdersComponents('main-orders-component')
    new BrandsParseComponent('brandss');
    new BrandsParseComponent('brandsd');
    new ListComponent('list-component');   //список элементов

    new Tabs({parent:'.tabs-contaiter'})
    new Spoiler()

    //new PriceToParse('parse')
    //TODO убрать всё что ниже в компоненты
    let server = new Server('admin'); //этот server deprecated


    // Вешаем на файловые инпуты обработку текста
    let files = document.querySelectorAll('.inputFile')
    for(let el of files){
        el.addEventListener('change', (e) =>{
            let that = e.target
            that.nextElementSibling.innerHTML = that.value.substr(that.value.lastIndexOf("\\")+1,that.length);
        })
    }

    // смена категории во время добавления товара
    let category_selector = document.querySelector('.category_selector')
    category_selector && category_selector.addEventListener('change', async function () {
        let answer  = await server.get(this.dataset.href,{id:this.value},{}, document.querySelector('input[name="_token"]'.value))
        answer.html && (document.querySelector('.product-options').innerHTML = answer.html)
    })
});


