function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselSlide = [...document.querySelectorAll('.carousel__slide')];

  carouselArrowLeft.style.display = 'none';
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    let shift = carouselSlide[0].offsetWidth;
    if (target === carouselArrowRight) {
      carouselArrowLeft.style.display = '';

      if (carouselSlide[0].style.transform === 'translateX(0px)' || carouselSlide[0].style.transform === '') {
        shift = carouselSlide[0].offsetWidth;
      } else if (carouselSlide[0].style.transform !== '') {
        shift += parseInt(carouselSlide[0].style.transform.slice(12, 17));
      }

      carouselSlide.forEach(item => {
        if (shift + carouselSlide[0].offsetWidth === carouselSlide[0].offsetWidth * carouselSlide.length) {
          carouselArrowRight.style.display = 'none'
        }
        item.style.transform = `translateX(-${shift}px)`;
      })

    } else if (target === carouselArrowLeft) {
      if (carouselSlide[0].style.transform !== '' || carouselSlide[0].style.transform !== 'translateX(0px)') {
        shift = parseInt(carouselSlide[0].style.transform.slice(12, 17)) - carouselSlide[0].offsetWidth;
        carouselArrowRight.style.display = ''
      }
      carouselSlide.forEach(item => {
        if (shift === 0) {
          carouselArrowLeft.style.display = 'none'
        }
        item.style.transform = `translateX(-${shift}px)`;
      })
    }
  })
}
