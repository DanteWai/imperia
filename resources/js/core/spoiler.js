export default class Spoiler {
    constructor(){
        this.init()
    }

    init(){
        let spoilers = document.querySelectorAll('.spoiler-trigger');


        for(let spoiler of spoilers){
            spoiler.addEventListener('click',this.click)
        }
    }

    click(){
        this.nextElementSibling.classList.toggle('active')
    }
}
