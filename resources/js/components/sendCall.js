import {Component} from "@core/component";
import Server from "@core/servers";

export class SendCallComponent extends Component {

   constructor(id) {
      super(id);
   }

   init() {
      
      this.btn = this.$el.querySelector('.call');
      this.send = this.$el.querySelector('.send');
      this.close = this.$el.querySelector('.f-btn-close');

      this.btn.addEventListener('click', collapse.bind(this));
      this.close.addEventListener('click', collapse.bind(this));
   
   }

}

function collapse(e) {
   const target = e.target;
   const parent = target.closest('#call');
   const collapse = parent.querySelector('.js-collapse');
   collapse.classList.toggle('collapse');
}