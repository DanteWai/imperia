import './../../scss/admin/adminStyle.scss';
import "regenerator-runtime/runtime";
import Server from './servers';
import Tabs from './tabs';
import {PriceToParse} from "./components/priceToParse";


//import route from './../route';

//
//import Lang from './../lang';
//console.log(route('productPage',['3','6'],[4]))
//console.log(Lang.get('auth.failed',{email:'email'}))
//Lang.setLocale('ru')
//Lang.has('auth.failed')
//Lang.choice('auth.failed',10,{email:'email'})

window.addEventListener('load',() => {


    new PriceToParse('parse')

    new Tabs({
        parent:'.tabs-contaiter',
    });

    let server = new Server();


    // Вешаем на файловые инпуты обработку текста


    // todo переписать на чистый js
    /*$('.inputFile').on('change',function(){
        this.nextElementSibling.innerHTML = this.value.substr(this.value.lastIndexOf("\\")+1,this.length);
    });



    $('.category_selector').on('change',function () {
        server.get(this.dataset.href + '?id=' + this.value,{
            'X-CSRF-TOKEN':$('input[name="_token"]').val(),
            "X-Requested-With": "XMLHttpRequest",
        }).then(answer=>{
            console.log(answer);
            if(answer.html){
                $('.product-options').html(answer.html)
            }

        });
    });*/

});


