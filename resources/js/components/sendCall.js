import {Component} from "@core/component";
import Server from "@core/servers";
import {Form} from "@core/form";
import {Validators} from "@core/validators";

export class SendCallComponent extends Component {

   constructor(id) {
      super(id);
   }

   init() {

      this.btn = this.$el.querySelector('.call');
      this.send = this.$el.querySelector('.send');
      this.close = this.$el.querySelector('.f-btn-close');
      this.$form = this.$el.querySelector('form');
      this.token = this.$el.querySelector('[name="_token"]').value

      this.$form.addEventListener('submit', submitHandler.bind(this));

      this.submit = new Form(this.$form, {
         phone: [Validators.required]
      });

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

function submitHandler(e) {

   e.preventDefault();
   const parent = e.target.closest('.js-collapse');

   if (this.submit.isValid()) {

      const formData = {
         ...this.submit.value()
      }

      this.submit.clear();
      parent.classList.add('collapse');





   }

}
