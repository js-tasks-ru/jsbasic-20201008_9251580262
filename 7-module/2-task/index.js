import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    this.elem = document.createElement('div');
    this.elem.classList.add('modal');



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


  }

  open() {
    document.body.classList.add('is-modal-open');
    document.body.insertAdjacentElement('afterbegin', this.elem);
    const modalClose = this.elem.querySelector('.modal__close');
    modalClose.onclick = () => {
      this.close();
      modalClose.onclick = null;
    }
    document.onkeydown = (e) => {
      if (e.code === 'Escape') {
        this.close();
        document.onkeydown = null;
      }

    }
  }

  setTitle(string) {
    const title = this.elem.querySelector('.modal__title');
    title.textContent = string;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.insertAdjacentElement('afterbegin', node);
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

}
