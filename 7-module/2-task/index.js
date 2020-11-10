import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.open();
    this.setTitle();
    this.setBody();
    this.removeElem();
  }

  open() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');
    document.body.classList.add('is-modal-open');
    this.elem.insertAdjacentHTML('afterbegin', `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
      </div>

      <div class="modal__body">
      </div>
    `)
    document.body.insertAdjacentElement('afterbegin', this.elem);
  }

  setTitle(string) {
    const title = this.elem.querySelector('.modal__title');
    title.textContent = string;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = node;
  }
  close() {
    let array = [...document.body.children];
    document.body.classList.remove('is-modal-open');
    array.forEach(item => {
      if (item.classList.contains('modal')) {
        item.remove();
      }
    })
  }

  removeElem() {
    const modalClose = this.elem.querySelector('.modal__close');
    modalClose.addEventListener('click', () => {
      this.close();
    })
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.close();
      }
    })

  }
}
