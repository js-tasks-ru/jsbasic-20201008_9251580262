export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.render();
    this.listener();
    this.sliderVChange();
  }

  render() {
    let spans = '';

    for (let i = 0; i < this.steps; i++) {
      if (i === 0) {
        spans += `<span class="slider__step-active"></span>`
      } else {
        spans += `<span></span>`;
      }
    }

    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>

      <div class="slider__progress"></div>

      <div class="slider__steps">
      ${spans}
     </div>
    `;

    document.body.insertAdjacentElement('afterbegin', this.elem);
  }

  listener() {

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      this.value = value;
      let valuePercents = value / segments * 100;
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let sliderSteps = [...this.elem.querySelector('.slider__steps').children];
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      sliderSteps.forEach(item => item.classList.remove('slider__step-active'));
      sliderSteps[value].classList.add('slider__step-active');
    })
  }

  sliderVChange() {
    this.elem.addEventListener('change', () => {
      let event = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(event);
    })
  }
}
