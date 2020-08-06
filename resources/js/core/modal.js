function _createFooter(buttons){
    if(buttons && buttons.length > 0){
        let $footer = document.createElement('div')
        $footer.classList.add('modal-footer')
        buttons.forEach(b => {
            let $button = document.createElement('button')
            $button.textContent = b.text
            $button.classList.add('btn')
            $button.classList.add(`${b.type || 'secondary'}`)
            $button.addEventListener('click', b.handler || function () {})
            $footer.appendChild($button)
        })
        return $footer
    }  return false
}

function _createModal(options){
    const modal = document.createElement('div')
    modal.classList.add('dmodal')

    let header = !options.showHeader ? '' :
        `<div class="modal-header">
            <span class="modal-title">${options.title || 'Модальное окно'}</span>
            ${options.closable ? '<span class="modal-close" data-modal-close>x</span>' : ''}
        </div>`

    let html = `
    <div class="modal-overlay" data-modal-close>
        <div class="modal-window" style="width: ${options.width || '700px'};">
            ${header}
            <div class="modal-body" data-content>
                ${options.content ? options.content : ''}
            </div>
        </div>
    </div>
    `
    modal.insertAdjacentHTML('afterbegin', html)

    let footer = _createFooter(options.footerButtons)
    if(footer){
        let content = modal.querySelector('[data-content]')
        // вставка элемента после определенного элемента
        content.parentNode.insertBefore(footer, content.nextSibling)
    }

    document.body.appendChild(modal)
    return modal
}

const ANIMATION_SPEED = 200
const closeModal = function(e) {
    if(typeof e.target.dataset.modalClose !== 'undefined') this.close()
}

export default class Modal {
    constructor(options) {
        this.$modal = _createModal(options)
        this.closing = false
        this.destroyed = false
        this.destroyAfterClose = options.destroyAfterClose

        this.onClose = (typeof options.onClose === 'function') ? options.onClose : function () {}
        this.onOpen = (typeof options.onOpen === 'function') ? options.onOpen : function () {}
        this.beforeClose = (typeof options.beforeClose === 'function') ? options.beforeClose : function () {return true}

        this.init()
    }

    init(){
        this.$modal.addEventListener('click', closeModal.bind(this))
    }

    appendClasses(str){
        let $window = this.$modal.querySelector('.modal-window')
        str.split(' ').forEach(el => {$window.classList.add(el)})
    }

    open() {
        if(!this.destroyed){
            this.$modal.classList.add('open')
            this.onOpen()
        } else {
            return console.log('modal destroyed')
        }
    }
    async close() {
        if(!!this.beforeClose() && !this.destroyed && !this.closing){

            this.closing = true
            this.$modal.classList.add('hidden')
            this.$modal.classList.remove('open')

            await new Promise((resolve, reject) => {
                setTimeout( () => {
                    this.$modal.classList.remove('hidden')
                    this.closing = false
                    this.onClose()
                    resolve()
                }, ANIMATION_SPEED)
            })
        }
    }
    destroy() {
        this.$modal.removeEventListener('click', closeModal)
        this.$modal.parentNode.removeChild(this.$modal)
        this.destroyed = true
    }
    setContent(html){ this.$modal.querySelector('.modal-body').innerHTML = html }
    setTitle(html){ this.$modal.querySelector('.modal-title').innerHTML = html }

}
