export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.render();
    this.step();
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

  }


  listener() {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', () => {

      const onMove = (event) => {

        this.elem.classList.add('slider_dragging');
        this.elem.querySelector('.slider__thumb').style.left = event.pageX + 'px';

        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 0;
        }

        let leftPercents = leftRelative * 100;
        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        this.value = value
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        let sliderValue = this.elem.querySelector('.slider__value');
        sliderValue.textContent = value;
        let sliderSteps = [...this.elem.querySelector('.slider__steps').children];
        sliderSteps.forEach(item => item.classList.remove('slider__step-active'));
        sliderSteps[value].classList.add('slider__step-active');
        this.sliderVChange();
      };


      document.addEventListener('pointermove', onMove);


      document.onpointerup = () => {
        document.removeEventListener('pointermove', onMove);
        thumb.onpointerup = null;
      }
    })

  }

  step() {
    this.elem.addEventListener('click', () => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 0;
      }

      let leftPercents = leftRelative * 100;
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      this.value = value;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      let sliderValue = this.elem.querySelector('.slider__value');
      sliderValue.textContent = value;
      let sliderSteps = [...this.elem.querySelector('.slider__steps').children];
      sliderSteps.forEach(item => item.classList.remove('slider__step-active'));
      sliderSteps[value].classList.add('slider__step-active');
    })
  }

  sliderVChange() {
    this.elem.addEventListener('click', () => {
      let event = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(event);
    })
  }
}
