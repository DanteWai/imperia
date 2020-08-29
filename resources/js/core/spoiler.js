export default class spoiler {
    constructor(){
        this.init()
    }

    init(){
        let spoilers = document.querySelectorAll('.spoiler-trigger');


        for(spoiler of spoilers){
            spoiler.addEventListener('click',this.click)
        }
    }

    click(){
        this.nextElementSibling.classList.toggle('active')
    }
}
