import '@scss/style';
import "regenerator-runtime/runtime";
import {CalculateParamComponent} from "./components/calculateParam";
import {CatalogContentComponent} from "./components/catalogContent";
import {BasketComponent} from "./components/basket";
import {OrderComponent} from "./components/order";
import {SendWriteComponent} from "./components/sendWrite";
import {SendCallComponent} from './components/sendCall';
import {LoaderComponent} from './components/loader';


window.addEventListener('load',() => {
    const basket = new BasketComponent('basket')
    const loader = new LoaderComponent('loader');
    new CalculateParamComponent('main-content') //компонет подборщика на главной странице
    new CatalogContentComponent('catalog-content', basket, {loader})
    new OrderComponent('order')
    new SendWriteComponent('write');
    new SendCallComponent('call');
});
