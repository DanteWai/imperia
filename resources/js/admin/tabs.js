export default class Tabs {
    constructor(params){
        this.parentsTabs = document.querySelectorAll(params.parent);
        this.init();
    }
    init(){
        for(let tabs of  this.parentsTabs){
            let tabsArticle = tabs.querySelectorAll('[data-t-article]');

            for(let [articleIndex, article] of tabsArticle.entries()){
                if(articleIndex === 0) {
                    article.classList.add("active");
                    tabs.querySelector(`[data-t-source="${article.dataset.tArticle}"] `).classList.add("active")
                }
                article.addEventListener('click', function(e){

                    if(!e.target.classList.contains('active')) {
                        let active = tabs.querySelector("[data-t-article].active");
                        active.classList.remove('active');
                        tabs.querySelector("[data-t-source="+ active.dataset.tArticle+ "]" ).classList.remove("active");

                        e.target.classList.add('active');
                        tabs.querySelector("[data-t-source="+ e.target.dataset.tArticle+ "]" ).classList.add("active");
                    }

                })
            }
        }

    }

}
