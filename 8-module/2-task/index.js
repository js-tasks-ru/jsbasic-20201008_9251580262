import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elemInner = document.createElement('div');
    this.elemInner.classList.add('products-grid__inner');
    this.elem.prepend(this.elemInner);
    this.render(this.products);

    const noNuts = document.querySelector('[data-no-nuts]');
    const vegetarian = document.querySelector('[data-vegetarian-only]');
    const maxSpiciness = document.querySelector('[data-max-spiciness]');
    const category = document.querySelector('[data-category]');
    (noNuts.checked) ? this.filters.noNuts = true : this.filters.noNuts = false;
    (vegetarian.checked) ? this.filters.vegetarian = true : this.filters.vegetarian = false;
    (maxSpiciness.checked) ? this.filters.maxSpiciness = 2 : this.filters.maxSpiciness = 0;
    (category.checked) ? this.filters.category = 'soups' : this.filters.category = '';
    this.updateFilter(this.filters);

  }

  render(products) {
    products.forEach(item => {
      const { name, price, category, image, id } = item;
      const elems = document.createElement('div');
      elems.classList.add('card');

      elems.insertAdjacentHTML('afterbegin', `
      <div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">€${price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `);

      const btn = elems.querySelector('.card__button');

      btn.addEventListener('click', () => {
        let event = new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        });
        elems.dispatchEvent(event);
      })
      this.elemInner.insertAdjacentElement('afterbegin', elems);
    })

  }

  updateFilter(filters) {
    if (filters.category || filters.maxSpiciness || filters.vegeterianOnly || filters.noNuts) {
      this.elemInner.innerHTML = '';
      let results1 = [];
      let results2 = [];
      let results3 = [];
      let results4 = [];
      (filters.category) ? results1 = this.products.filter(item => item.category === filters.category) : results1 = [];
      (filters.maxSpiciness) ? results2 = this.products.filter(item => item.spiciness > filters.maxSpiciness) : results2 = [];
      (filters.vegeterianOnly) ? results3 = this.products.filter(item => item.vegeterian) : results3 = [];
      (filters.noNuts) ? results4 = this.products.filter(item => item.nuts) : results4 = [];
      let results = [];
      results = results.concat(results1, results2, results3, results4);
      this.render(results);

    } else {
      this.render(this.products);
    }


  }
}
