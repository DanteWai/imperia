import $ from 'jquery';
import '@scss/style';
import "regenerator-runtime/runtime";
import './library/jquery.jscrollpane'
import {CalculateParamComponent} from "./components/calculateParam";
import {CatalogContentComponent} from "./components/catalogContent";
import {BasketComponent} from "./components/basket";
import {OrderComponent} from "./components/order";


window.addEventListener('load',() => {

    jQuery('.scrollbar-inner').scrollbar();
    new CalculateParamComponent('main-content') //компонет подборщика на главной странице
    new CatalogContentComponent('catalog-content')
    new BasketComponent('basket')
    new OrderComponent('order')
});
