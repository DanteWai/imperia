import {Component} from "@core/component";
import Server from "@core/servers";

export class FilterComponent extends Component {
   constructor(id) {
      super(id);
  }

   init() {
      this.server = new Server();
      this.event = new Event('showFilter',{bubbles: false, cancelable: false});
      this.$catalog = document.getElementById('catalog-content');
      this.$catalog.addEventListener('click', collapse.bind(this));
   }
}

function collapse(e) {
   const target = e.target.closest('.filter');

   if (target) {
      this.$el.classList.toggle('active');
      const icon = (this.$el.classList.contains('active')) ? 'arrow-left' : 'filter';
      target.innerHTML = `
      <svg class="filter-icon">
         <use xlink:href="/public/images/sprite.svg#${icon}"></use>
      </svg>
      `;
      this.$el.dispatchEvent(this.event);
   }
}