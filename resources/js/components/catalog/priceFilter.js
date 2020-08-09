
export class PriceFilter {
    constructor({priceMaxLimit, priceMinLimit = 0, currentMax = '', currentMin = ''}) {
        this.priceMaxLimit = priceMaxLimit
        this.priceMinLimit = priceMinLimit
        this.currentMax = currentMax
        this.currentMin = currentMin
        this._init()
    }

    _init(){
        console.log('price filter init')
        this.currentMaxOld = this.currentMax
        this.currentMinOld = this.currentMin

       /* this.$minPrice = this.$el.getElementById('min-price');
        this.$maxPrice = this.$el.getElementById('max-price');
        this.$minPrice.addEventListener('change', changePrice.bind(this));
        this.$maxPrice.addEventListener('change', changePrice.bind(this));*/

        this.$el = _create()
    }


    getTemplate(){
        return this.$el.outerHTML
        return `<div data-type="search" data-option-filter="base_option" data-filter="price" class="filter-price">
                    <input type="text" name="min-price" data-price="0" id="min-price" placeholder="от" class="price-input" value="${object?.price?.min ?? ''}">
                    <input type="text" name="max-price" data-price="${this.priceMaxLimit}" id="max-price" placeholder="до" class="price-input" value="${object?.price?.max ?? ''}">
                </div>`
    }

    /*
    * <div class="sort-item">
                    <span class="sort-item__title">Цена:</span>

                </div>
    *
    *
    * */

}

function _create(){
    let $sortItem = document.createElement('div')
        $sortItem.classList.add('sort-item')

    let $sortItemTitle = document.createElement('span')
        $sortItemTitle.classList.add('sort-item__title')
        $sortItemTitle.textContent = 'Цена:'

    let $filterPrice = document.createElement('div')
        $filterPrice.dataset.type = 'search'
        $filterPrice.dataset.optionFilter = 'base_option'
        $filterPrice.dataset.filter = 'price'
        $filterPrice.classList.add('filter-price')

    let $minPrice = document.createElement('input')
    let $maxPrice = document.createElement('input')


    $filterPrice.insertAdjacentElement('beforeend', $minPrice)
    $filterPrice.insertAdjacentElement('beforeend', $maxPrice)

    $sortItem.insertAdjacentElement('beforeend', $sortItemTitle)
    $sortItem.insertAdjacentElement('beforeend', $filterPrice)


    return $sortItem
}

function changePrice(e) {
    const target = e.target;
    console.log(e.target)
    const price = Number(target.dataset.price);
    let min = 0;
    let max = 0;
    let elem;
    let value = Number(target.value);

    if (target.name === 'min-price') {          // Если изменен input min
        elem = target.nextElementSibling;       // input max
        min = price;                            // min равен значению data атрибута
        max = elem.value ? Number(elem.value) : Number(elem.dataset.price);     // если max не пустой, то он равен своему значению, иначе data атрибуту
    } else {                                    // обратное с max
        elem = target.previousElementSibling;
        max = price;
        min = elem.value ? Number(elem.value) : Number(elem.dataset.price);
    }

    value = Number.isNaN(value) || value === 0 ? price : Math.min(Math.max(value, min), max);  // проверка на число и диапазон



    if(target.value == value) {
        console.log('ravn')
        return
    }
    target.value = value;


    this.$el.dispatchEvent(new CustomEvent('change-price',{detail:{page:1}}));
}
