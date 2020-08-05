export default class Select{
    constructor(select, options){
        if(select instanceof HTMLElement) { this.$el = select } //Если переданный селект это HTML элемент то мы просто его присваиваем
        else { //Иначе ищем все элементы по переданноому селектору
            this.$el = document.querySelectorAll(select)

            if(this.$el.length > 1){ //если таких элементов больше одного то для всех них создаем этот же класс
                let elements = []
                this.$el.forEach(el => { elements.push(new Select(el, options)) })
                return elements
            }
            else{ this.$el = this.$el[0] } // иначе просто присваиваем ео
        }

        this.options = options
        this.selectItem = null
        this.selectItems = []
        this._init()
    }

    _init(){
        this.clickHandler = this.clickHandler.bind(this)  //привязываем контекст
        this.$el.addEventListener('click', this.clickHandler)//Вешаем обработчик на клик селекта
        this.$input = this.$el.querySelector('[data-type="value"]') //Элемент тела селектора
        this.placeholder = this.$input.textContent
        if(this.options.appendClass) this.$el.classList.add(this.options.appendClass)
    }

    open(){ this.$el.classList.add('open') }
    close(){ this.$el.classList.remove('open') }
    get isOpen(){ return this.$el.classList.contains('open') }
    get isEmptyMultiple(){ return !this.selectItems.length }
    get multiplePlaceHolder() { return this.isEmptyMultiple ? this.placeholder : this.selectItems.map(el => el.textContent).toString() }


    clickHandler(e){
        console.log('click')
        let {type} = e.target.dataset

        if(e.target.closest('[data-type="input"]')) type = 'input'

        switch (type) {
            case 'input':
                this.isOpen ? this.close() : this.open()
                break;
            case 'item':
                this.select(e.target)
                break;
        }
    }


    select(item){

        if(this.options.multiple){
            this.selectItem = item

            if(item.classList.contains('active')){
                item.classList.remove('active')
                this.selectItems.splice(this.selectItems.indexOf(item), 1)
            } else{
                item.classList.add('active')
                this.selectItems.push(item)
            }
            this.$input.textContent = this.multiplePlaceHolder
        } else{
            this.selectItem && this.selectItem.classList.remove('active')
            this.selectItem = item
            this.$input.textContent = this.selectItem.textContent
            this.selectItem.classList.add('active')
            this.close()
        }


        if(typeof this.options?.onSelect === 'function') this.options.onSelect.call(item)
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler)
        //this.$el.innerHTML = ''
    }
}
