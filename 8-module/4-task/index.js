import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    let itemProduct = {
      product: product,
      count: 1,
    }
    if (this.cartItems.some(item => item.product === itemProduct.product)) {
      this.cartItems.forEach(item => {
        if (item.product === itemProduct.product) {
          item.count += 1;
        }
      });

    } else {
      this.cartItems.push(itemProduct);
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id == productId) {
        item.count += amount;
        if (item.count == 0) {
          this.cartItems.splice(index, 1);
          this.onProductUpdate(this.cartItems);
        }
      }
    })
  }

  isEmpty() {
    (this.cartItems.length === 0) ? true : false;
  }

  getTotalCount() {
    let result = this.cartItems.reduce((sum, item) => sum + item.count, 0);
    return result;
  }

  getTotalPrice() {
    let result = 0;
    this.cartItems.forEach(item => {
      result += (item.product.price * item.count);
    })
    return result;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.open();
    modal.setTitle("Your order");
    modal.setBody(this.renderOrderForm());
    this.cartItems.forEach(item => {
      modal.setBody(this.renderProduct(item.product, item.count));
    });
    const btnPlus = document.querySelectorAll('.cart-counter__button_plus');
    const btnMinus = document.querySelectorAll('.cart-counter__button_minus');
    const cartCount = document.querySelectorAll('.cart-counter__count');
    const infoPrice = document.querySelector('.cart-buttons__info-price');
    const cartIcon = document.querySelector('.cart-icon');

    btnPlus.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.cartItems.forEach(item => {
          if (item.product.id === event.target.closest('.cart-product').dataset.productId) {
            item.count += 1;
            cartCount.forEach(item => {
              if (item === event.target.parentElement.parentElement.children[1]) {
                item.textContent = parseInt(item.textContent.trim()) + 1;
              }
            })
          }
        });
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      })
    })

    btnMinus.forEach(elem => {
      elem.addEventListener('click', (event) => {
        this.cartItems.forEach((item, index) => {
          if (item.product.id === event.target.closest('.cart-product').dataset.productId) {
            item.count -= 1;
            cartCount.forEach(items => {
              if (items === event.target.parentElement.parentElement.children[1]) {
                if (items.textContent >= 1) {
                  items.textContent = parseInt(items.textContent.trim()) - 1;
                } else if (items.textContent == 0) {
                  event.target.closest('.cart-product').remove();
                  this.cartItems.splice(index, 1);
                }
              }
            })
          }
        });
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
        if (this.cartItems.length == 0) {
          modal.close();
          cartIcon.classList.remove('cart-icon_visible');
        }
      })
    })

    const cartForm = document.querySelector('.cart-form');
    cartForm.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

  }

  async onSubmit(event) {

    event.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    const cartForm = document.querySelector('.cart-form');
    const modalBodyInner = document.createElement('div');
    const modalTitle = document.querySelector('.modal__title');
    const modalBoby = document.querySelector('.modal__body');
    const cartIcon = document.querySelector('.cart-icon');


    modalBodyInner.classList.add('modal__body-inner');
    modalBodyInner.innerHTML = '<p> Order successful! Your order is being cooked :) <br> We’ll notify you about delivery time shortly.<br> <img src="/assets/images/delivery.gif"> </p>'
    btn.classList.add('is-loading');
    let body = new FormData(cartForm);
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: body,
    });

    if (response.status == 200) {
      modalTitle.textContent = 'Success!';
      this.cartItems = [];
      modalBoby.innerHTML = '';
      modalBoby.append(modalBodyInner);
      cartIcon.classList.remove('cart-icon_visible');
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

