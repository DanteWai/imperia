//Подключение стилей
import '@scss/style';
//Подключение полифилов
import "regenerator-runtime/runtime";
//Главная страница
import {CalculateParamComponent} from "./components/mainPage/calculateParam";
//Каталог
import {CatalogContentComponent} from "./components/catalog/catalogContent";
import {ProductPageComponent} from './components/catalog/productPage';
//Оформление заказа
import {OrderComponent} from "./components/order/order";
//Отправка писем в футере
import {SendWriteComponent} from "./components/footer/sendWrite";
import {SendCallComponent} from './components/footer/sendCall';
//Общее
import {BasketComponent} from "./components/all/basket";
import Modal from "@core/modal";


window.addEventListener('load',() => {
    const basket = new BasketComponent('basket')
    new CalculateParamComponent('main-content') //компонет подборщика на главной странице
    new CatalogContentComponent('catalog-content',  {basket})
    new OrderComponent('order')
    new SendWriteComponent('write');
    new SendCallComponent('call');
    new ProductPageComponent('product-page', basket);

    const modal = new Modal({
        showHeader:false,
        onOpen(){
            setTimeout(() =>{
                modal.close().then(() => {
                    modal.destroy()
                })
            },2000)
        }
    })
    setTimeout(function () {
        modal.setContent(`<p>Ваше сообщение успешно отправлено</p>`)
        modal.open()
    }, 2000)


});
