import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.holder = document.getElementById('holder')
    this.product = product;
    this.elem = this.render();
    this.btn = document.querySelector('card__button');
  }

  render() {
    const { name, price, category, image, id } = this.product;
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
    return elems;
  }
}



