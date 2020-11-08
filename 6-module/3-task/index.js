import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.showCarousel();
    this.render();
    this.nextElem();
    this.lintener();
  }

  showCarousel() {
    this.elem.classList.add('carousel');
    this.elem.insertAdjacentHTML('afterbegin', `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    `);

  }

  render() {
    this.wrapper.classList.add('carousel__inner');
    this.elem.insertAdjacentElement('beforeend', this.wrapper);

    this.slides.forEach(item => {
      const { name, price, image, id } = item;


      const slide = `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
      this.wrapper.insertAdjacentHTML('beforeend', slide);
    })

  }

  lintener() {
    const btns = [...this.wrapper.querySelectorAll('.carousel__button')];
    btns.forEach(item => {
      item.addEventListener('click', (e) => {
        let event = new CustomEvent("product-add", {
          detail: e.target.closest('.carousel__slide').dataset.id,
          bubbles: true,
        });
        console.log(event.detail);
        e.target.closest('.carousel__slide').dispatchEvent(event);
      })
    })
  }

  nextElem() {
    const carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    const carouselSlide = [...this.elem.querySelectorAll('.carousel__slide')];

    carouselArrowLeft.style.display = 'none';
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      let shift = this.wrapper.offsetWidth;

      if (target === carouselArrowRight) {
        carouselArrowLeft.style.display = '';

        if (this.wrapper.style.transform === 'translateX(0px)' || this.wrapper.style.transform === '') {
          shift = this.wrapper.offsetWidth;
        } else if (this.wrapper.style.transform !== '') {
          shift += parseInt(this.wrapper.style.transform.slice(12, 17));
        }


        if (shift + this.wrapper.offsetWidth === this.wrapper.offsetWidth * carouselSlide.length) {
          carouselArrowRight.style.display = 'none'
        }
        this.wrapper.style.transform = `translateX(-${shift}px)`;


      } else if (target === carouselArrowLeft) {
        if (this.wrapper.style.transform !== '' || this.wrapper.style.transform !== 'translateX(0px)') {
          shift = parseInt(this.wrapper.style.transform.slice(12, 17)) - this.wrapper.offsetWidth;
          carouselArrowRight.style.display = ''
        }

        if (shift === 0) {
          carouselArrowLeft.style.display = 'none'
        }
        this.wrapper.style.transform = `translateX(-${shift}px)`;
      }
    })
  }
}
