import {Component} from "@core/component";
import Modal from '@core/modal';
import Server from "@core/servers";

export class BrandsParseComponent extends Component {

   constructor(id) {
      super(id);
   }


   async init() {
      this.server = new Server('admin');
       this.api = new Server();
       /*let api = new Server();
       api.get('/api/brands').then((answer) => {
           console.log(answer)
       }).catch((e)=>{
           console.log(e)
       })*/

      this.brandsList = await this.api.get('api/brands').then(data => data.map(item => item.brand_name));

      this.hand = null;
      this.replace = null;
      this.addModal = false;
      this.editModal = false;
      this.token = document.querySelector('[name="_token"]').value;
      this.$el.addEventListener('click', addBrand.bind(this));
      this.$el.addEventListener('click', editBrand.bind(this));
   }

}

// Добавление бренда в базу
function addBrand(e) {
   const target = e.target.closest('.js-add-brand');
   if (target) {
      const name = target.dataset.title;
      this.hand = formHandler.bind(this, e, name);
      const title = 'Добавление производителя';
      const content = `
      <div class="content-wrapper form">
            <form method="POST" action="http://imperia/imperia_admin_panel/brands" accept-charset="UTF-8" enctype="multipart/form-data" id="add-brand">
               <div class="form-body">
                  <div class="form-section">
                     <label for="brand_name">Название</label>
                     <input class="form-model text-input" type="text" placeholder="Название" name="brand_name" id="brand_name" value="${name}">
                  </div>
               </div>
               <div class="form-body">
                  <div class="form-section">
                     <label for="category">Категория</label>
                     <div class="select">
                        <select multiple class="select" name="category[]" id="category">
                           <option value="1">Шины</option>
                           <option value="2">Диски</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div class="form-body">
                  <div class="form-section">
                     <label for="brand_desc">Описание</label>
                     <textarea class="text-input" placeholder="Описание" name="brand_desc" id="brand_desc" cols="30" rows="10"></textarea>
                  </div>
               </div>
               <div>
                  <input class="inputFile" type="file" name="brand_logo" id="brand_logo" data-multiple-caption="{count} files selected">
                  <label for="brand_logo">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                     <span>Выбор изображения</span>
                  </label>
               </div>
            </form>
         </div>
      `;

      if(!this.addModal){
         this.addModal = new Modal({
             showHeader: true,
             title,
             width: '80%',
             closable: true,
             footerButtons: [
                  {
                     text: 'Сохранить',
                     type: 'bg-success',
                     handler: () => {
                        this.hand();
                     }
                  },
                 {
                     text: 'Отменить',
                     type: 'bg-danger',
                     handler: () => {
                         this.addModal.close()
                     }
                 },
                 {
                     text: 'Закрыть',
                     type: 'bg-basic',
                     handler: () => {
                         this.addModal.close()
                     }
                 }
             ],
             content
         });
     } else{
         this.addModal.setTitle(title)
         this.addModal.setContent(content)
     }

     this.addModal.open()
   }
}

// Редактирование бренда
function editBrand(e) {
   const target = e.target.closest('.js-edit-brand');
   if (target) {
      const name = target.dataset.title;
      this.replace = replaceBrand.bind(this, e, name);
      const title = `Редактирование производителя ${name}`;
      const content = `
         <div class="content-wrapper form">
            <div class="form-body">
               <div class="form-section">
                  <label for="brand_name">Производитель</label>
                  <input class="form-model text-input js-input-brand" type="text" placeholder="Производитель" name="brand_name" id="brand_name" autocomplete="off">
               </div>

               <div class="form-list">
                  <ul class="brands-list hide">
                     ${this.brandsList.map(item => `<li class="brands-item">${item}</li>`).join('')}
                  </ul>
               </div>
            </div>
         </div>
      `;

      if (!this.editModal) {
         this.editModal = new Modal({
            showHeader: true,
            title,
            width: '80%',
            closable: true,
            footerButtons: [
               {
                  text: 'Сохранить',
                  type: 'bg-success',
                  handler: () => {
                     this.replace();
                  }
               },
               {
                  text: 'Отменить',
                  type: 'bg-danger',
                  handler: () => {
                        this.editModal.close()
                  }
               },
               {
                  text: 'Закрыть',
                  type: 'bg-basic',
                  handler: () => {
                        this.editModal.close()
                  }
               }
            ],
            content
         });
      } else {
         this.editModal.setTitle(title)
         this.editModal.setContent(content)

     }
   autocomplete(this.brandsList);
     this.editModal.open()
   }
}

// Добавление производителя в базу
async function formHandler(e, name) {
   const form = document.getElementById('add-brand');
   const brandName = form.brand_name;
   const row = e.target.closest('tr');

   // Проверка на заполнение полей
   if (brandName.value.trim() === '' || form['category[]'].options.selectedIndex === -1) {
      if (brandName.value.trim() === '') {
         const label = brandName.previousElementSibling;
         label.textContent = 'Название не должно быть пустым';
         label.style.color = 'red';
         const brandNameChange = () => {
            label.textContent = 'Название';
            label.style.color = '';
            console.log(123);
            brandName.removeEventListener('change', brandNameChange);
         }
         brandName.addEventListener('change', brandNameChange);
      }

      if (form['category[]'].options.selectedIndex === -1) {
         const label = document.querySelector('label[for="category"]');
         label.textContent = 'Выберите одну или несколько категорий';
         label.style.color = 'red';
         const categoryChange = () => {
            label.textContent = 'Категория';
            label.style.color = '';
            console.log(123);
            form['category[]'].removeEventListener('change', categoryChange);
         }
         form['category[]'].addEventListener('change', categoryChange);
      }

      return;
   }

   const formData = new FormData(form);

   let answer = await this.api.post('api/brands', formData, this.token)
    this.addModal.close();

      row.innerHTML = `
         <td>${brandName.value}</td>
         <td colspan="2" class="table-td_center table-td_success">Этот производитель уже есть</td>
      `;
      console.log('answer', answer);
      this.brandsList.push(brandName.value);    // Добавляем новый бренд в массив брендов

   if (brandName.value !== name) renameBrand(name, brandName.value);
}

// Автокомплит для редактирования
function autocomplete(brandsList) {
   const input = document.querySelector('.js-input-brand');
   const list = document.querySelector('.brands-list');
   let access = brandsList.filter(item => item.search(new RegExp(input.value.trim(), 'i')) !== -1);

   input.addEventListener('focus', () => {
      const label = input.previousElementSibling;
      label.textContent = 'Производитель';
      label.style.color = '';
      access = brandsList.filter(item => item.search(new RegExp(input.value.trim(), 'i')) !== -1);
      if (access.length) {
         list.innerHTML = '';
         list.innerHTML = `
            ${access.map(item => `<li class="brands-item">${item}</li>`).join('')}
         `;
         list.classList.remove('hide');
      }
   });

   list.addEventListener('click', e => {
      const target = e.target.closest('.brands-item');
      if (target) {
         access = brandsList.filter(item => item.search(new RegExp(input.value.trim(), 'i')) !== -1);
         input.value = target.textContent;
         input.focus();
         list.innerHTML = '';
         list.innerHTML = `
            ${access.map(item => `<li class="brands-item">${item}</li>`).join('')}
         `;
         list.classList.add('hide');
      }
   });

   input.addEventListener('input', () => {
      access = brandsList.filter(item => item.search(new RegExp(input.value.trim(), 'i')) !== -1);

      if (access.length) {
         list.classList.remove('hide');
         list.innerHTML = '';
         list.innerHTML = `
            ${access.map(item => `<li class="brands-item">${item}</li>`).join('')}
         `;
      } else {
         list.classList.add('hide');
      }
   });
}

// Переименование производителя
function replaceBrand(e, name) {
   const input = document.querySelector('.js-input-brand');

   // Проверяем поле на пустоту
   if (input.value.trim() === '') {
      const label = input.previousElementSibling;
      label.textContent = 'Поле не должно быть пустым';
      label.style.color = 'red';
      return;
   } else {
      const row = e.target.closest('tr');
      renameBrand(name, input.value);

      row.innerHTML = `
         <td>${name}</td>
         <td class="table-td_center table-td_primary">Связан с "${input.value}"</td>
         <td class="table-td_center">
            <svg class="edit-brand js-edit-brand" data-title="${input.value}">
                  <use xlink:href="/images/sprite.svg#edit"></use>
            </svg>
         </td>
      `;

      this.editModal.close();
   }
}

// Переимнование бренда в таблице товаров
function renameBrand(name, input) {
   const brands = document.querySelectorAll('.js-brand-name');
   brands.forEach(item => {
      if (item.textContent.trim() === name.trim()) {
         item.textContent = input;
         item.style.color = 'orange';
      }
   });
}
