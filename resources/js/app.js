import '@scss/style';
import "regenerator-runtime/runtime";
import {CalculateParamComponent} from "./components/calculateParam";
import {CatalogContentComponent} from "./components/catalogContent";
import {BasketComponent} from "./components/basket";
import {OrderComponent} from "./components/order";


window.addEventListener('load',() => {
    const basket = new BasketComponent('basket')
    new CalculateParamComponent('main-content') //компонет подборщика на главной странице
    new CatalogContentComponent('catalog-content', basket)
    new OrderComponent('order')
});
