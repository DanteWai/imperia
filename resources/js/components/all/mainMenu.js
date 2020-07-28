import {Component} from "@core/component";

export class MainMenuComponent extends Component {
   constructor(id){
      super(id)
   }

   init() {
      this.$burger = this.$el.querySelector('.v-nav__burger');
      this.$menu = this.$el.querySelector('.v-nav__menu');
      this.width = document.documentElement.clientWidth;

      this.$burger.addEventListener('click', toggleBurger.bind(this));
      this.$menu.addEventListener('click', (e) => {
         const target = e.target;
         if (target.closest('.v-nav__item') && this.width < 768) {
            toggleBurger.call(this);
         }
      });
   }
}

function toggleBurger() {
   this.$burger.classList.toggle('active');
   this.$menu.classList.toggle('active');
}