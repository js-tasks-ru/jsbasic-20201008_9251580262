export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    let result = this.cartItems.reduce((sum, item) => (sum + item.product.price) * item.count, 0);
    return result;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

