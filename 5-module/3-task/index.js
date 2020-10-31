function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselSlide = [...document.querySelectorAll('.carousel__slide')];
  const carouselInner = document.querySelector('.carousel__inner');

  carouselArrowLeft.style.display = 'none';
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    let shift = carouselInner.offsetWidth;
    if (target === carouselArrowRight) {
      carouselArrowLeft.style.display = '';

      if (carouselInner.style.transform === 'translateX(0px)' || carouselInner.style.transform === '') {
        shift = carouselInner.offsetWidth;
      } else if (carouselInner.style.transform !== '') {
        shift += parseInt(carouselInner.style.transform.slice(12, 17));
      }


      if (shift + carouselInner.offsetWidth === carouselInner.offsetWidth * carouselSlide.length) {
        carouselArrowRight.style.display = 'none'
      }
      carouselInner.style.transform = `translateX(-${shift}px)`;


    } else if (target === carouselArrowLeft) {
      if (carouselInner.style.transform !== '' || carouselInner.style.transform !== 'translateX(0px)') {
        shift = parseInt(carouselInner.style.transform.slice(12, 17)) - carouselInner.offsetWidth;
        carouselArrowRight.style.display = ''
      }

      if (shift === 0) {
        carouselArrowLeft.style.display = 'none'
      }
      carouselInner.style.transform = `translateX(-${shift}px)`;

    }
  })
}
