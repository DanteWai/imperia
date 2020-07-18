export class LoaderComponent {

    constructor() {
        this.$target = null
    }

    mount($target){
        $target.classList.add('loader-wrap')
        $target.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>'
        this.$target = $target
    }
    unmount(){
        this.$target.classList.remove('loader-wrap')
    }

}
