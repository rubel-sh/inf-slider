interface SliderOptions {
  slideWidth: string;
  scrollSpeed: string; // Pixels per second
  direction: 'normal' | 'reverse';
  pauseOnHover: boolean;
}
  
export function initInfiniteSliders(): void {
    const sliders: NodeListOf<HTMLElement> =
      document.querySelectorAll('.inf-slider');
  
    sliders.forEach((slider: HTMLElement) => {
      const options: SliderOptions = {
        slideWidth: slider.dataset.infSlideWidth || '420px',
        scrollSpeed: slider.dataset.infScrollSpeed || '100', // Default scroll speed 100px/s
        direction: (slider.dataset.infDirection === 'reverse'
          ? 'reverse'
          : 'normal') as 'normal' | 'reverse',
        pauseOnHover: slider.dataset.infSlidePauseOnHover === 'true',
      };
  
      const track: HTMLElement | null = slider.querySelector('.inf-slide-track');
      if (!track) return;
  
      const slides: HTMLCollectionOf<HTMLElement> = track.getElementsByClassName(
        'inf-slide'
      ) as HTMLCollectionOf<HTMLElement>;
      const numSlides: number = slides.length;
  
      // Set CSS variables
      slider.style.setProperty('--num-slides', numSlides.toString());
      slider.style.setProperty('--slide-width', options.slideWidth);
  
      // Apply width to each slide and clone slides
      Array.from(slides).forEach((slide: HTMLElement) => {
        slide.style.width = options.slideWidth;
        const clone: Node = slide.cloneNode(true);
        track.appendChild(clone);
      });
  
      // Calculate the total width the track needs to move
      const slideWidthNum: number = parseFloat(options.slideWidth);
      const totalWidth: number = slideWidthNum * numSlides * 2; // Original + cloned slides
  
      // Set track width
      track.style.width = `${totalWidth}px`;
  
      // Calculate animation duration based on scrollSpeed (pixels per second)
      const scrollSpeed: number = parseFloat(options.scrollSpeed);
      const animationDuration: number = totalWidth / scrollSpeed; // time = distance / speed
  
      // Set the animation with calculated duration
      const animationName = `inf-scroll${options.direction === 'reverse' ? '-reverse' : ''}`;
      track.style.animation = `${animationName} ${animationDuration}s linear infinite`;
  
      // Add pause on hover functionality
      if (options.pauseOnHover) {
        slider.addEventListener('mouseenter', () => {
          track.style.animationPlayState = 'paused';
        });
  
        slider.addEventListener('mouseleave', () => {
          track.style.animationPlayState = 'running';
        });
      }
    });
}
  