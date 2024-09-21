function initInfiniteSliders() {
  const sliders = document.querySelectorAll('.inf-slider');

  sliders.forEach(function (slider) {
    const options = {
      slideWidth: slider.dataset.infSlideWidth || '420px',
      scrollSpeed: slider.dataset.infScrollSpeed || '100', // Default scroll speed 100px/s
      direction: slider.dataset.infDirection === 'reverse' ? 'reverse' : 'normal',
      pauseOnHover: slider.dataset.infSlidePauseOnHover === 'true',
    };

    const track = slider.querySelector('.inf-slide-track');
    if (!track) return;

    const slides = track.getElementsByClassName('inf-slide');
    const numSlides = slides.length;

    // Set CSS variables
    slider.style.setProperty('--num-slides', numSlides.toString());
    slider.style.setProperty('--slide-width', options.slideWidth);

    // Apply width to each slide and clone slides
    Array.prototype.forEach.call(slides, function (slide) {
      slide.style.width = options.slideWidth;
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    // Calculate the total width the track needs to move
    const slideWidthNum = parseFloat(options.slideWidth);
    const totalWidth = slideWidthNum * numSlides * 2; // Original + cloned slides

    // Set track width
    track.style.width = `${totalWidth}px`;

    // Calculate animation duration based on scrollSpeed (pixels per second)
    const scrollSpeed = parseFloat(options.scrollSpeed);
    const animationDuration = totalWidth / scrollSpeed; // time = distance / speed

    // Set the animation with calculated duration
    const animationName = `inf-scroll${options.direction === 'reverse' ? '-reverse' : ''}`;
    track.style.animation = `${animationName} ${animationDuration}s linear infinite`;

    // Add pause on hover functionality
    if (options.pauseOnHover) {
      slider.addEventListener('mouseenter', function () {
        track.style.animationPlayState = 'paused';
      });

      slider.addEventListener('mouseleave', function () {
        track.style.animationPlayState = 'running';
      });
    }
  });
}
