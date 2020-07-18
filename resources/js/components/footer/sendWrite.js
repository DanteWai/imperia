import {Component} from "@core/component";
import Server from "@core/servers";
import {Form} from "@core/form";
import {Validators} from "@core/validators";

export class SendWriteComponent extends Component {

   constructor(id) {
      super(id);
   }

   init() {

      this.server = new Server();
      this.btn = this.$el.querySelector('.write');
      this.send = this.$el.querySelector('.send');
      this.close = this.$el.querySelector('.f-btn-close');
      this.$form = this.$el.querySelector('form');
      this.token = this.$el.querySelector('[name="_token"]').value

      this.$form.addEventListener('submit', submitHandler.bind(this));

      this.submit = new Form(this.$form, {
         fio: [Validators.required],
         email: [Validators.required],
         phone: [Validators.required, Validators.phoneValid],
         message: [Validators.required, Validators.minLength(10)]
      });



      this.btn.addEventListener('click', collapse.bind(this));
      this.close.addEventListener('click', collapse.bind(this));

   }

}

function collapse(e) {
   const target = e.target;
   const parent = target.closest('#write');
   const collapse = parent.querySelector('.js-collapse');
   collapse.classList.toggle('collapse');
}

function submitHandler(e) {

   e.preventDefault();
   const parent = e.target.closest('.js-collapse');

   if (this.submit.isValid()) {

      const formData = {
         ...this.submit.value(),
          type:'f_message'
      }

      this.submit.clear();
      parent.classList.add('collapse');

      this.server.post('send_mail', JSON.stringify(formData), {'Content-Type': 'application/json;charset=utf-8'}, this.token).then(answer => {
           console.log(answer)
           if(answer.success){
               //
           } else{
               //
           }
       })

   }

}
