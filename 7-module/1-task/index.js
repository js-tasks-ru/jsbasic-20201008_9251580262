import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.render();
    this.showScroll();
    this.listener();
  }

  render() {
    let links = '';
    this.categories.forEach((item, index) => {
      if (index === 0) {
        links += `<a href="#" class="ribbon__item ribbon__item_active" data-id=${item.id}>${item.name}</a>`
      } else {
        links += `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`
      }
    });

    this.elem.insertAdjacentHTML('afterbegin', `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    ${links}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
      `)
  }


  showScroll() {
    const leftBtn = this.elem.querySelector('.ribbon__arrow_left');
    const rightBtn = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonItem = this.elem.querySelectorAll('.ribbon__item');

    leftBtn.addEventListener('click', () => {
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      if (scrollRight <= 1) {
        leftBtn.classList.remove('ribbon__arrow_visible');
        rightBtn.classList.add('ribbon__arrow_visible');
        ribbonItem[0].classList.remove('ribbon__item_active')
        ribbonItem[ribbonItem.length - 1].classList.add('ribbon__item_active')
      } else {
        ribbonInner.scrollBy(350, 0);
      }
    })

    rightBtn.addEventListener('click', () => {
      if (ribbonInner.scrollLeft === 0) {
        leftBtn.classList.add('ribbon__arrow_visible');
        rightBtn.classList.remove('ribbon__arrow_visible');
        ribbonItem[0].classList.add('ribbon__item_active')
        ribbonItem[ribbonItem.length - 1].classList.remove('ribbon__item_active')
      } else {
        ribbonInner.scrollBy(-350, 0);
      }
    })
  }

  listener() {
    const ribbonItem = [...this.elem.querySelectorAll('.ribbon__item')];
    ribbonItem.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        let activeElem = ribbonItem.find(item => item.classList.contains('ribbon__item_active'));
        activeElem.classList.remove('ribbon__item_active');
        item.classList.add('ribbon__item_active');
        let event = new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        })
        item.dispatchEvent(event);
      })
    })
  }
}
