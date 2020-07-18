export class LoaderComponent {

    constructor(target = null) {
        this.$target = target
    }

    mount($target){
        $target.classList.add('loader-wrap')
        $target.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
        this.$target = $target
    }
    unmount(){
        this.$target.classList.remove('loader-wrap')
        let lds = this.$target.querySelector('.lds-ring')

        lds && lds.parentNode.removeChild(lds)


    }

}
