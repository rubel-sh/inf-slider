/**
 * @typedef {Object} SliderOptions
 * @property {string} slideWidth - Width of each slide
 * @property {string} animationSpeed - Duration of the animation
 * @property {('normal'|'reverse')} direction - Direction of the animation
 * @property {boolean} pauseOnHover - Whether to pause on hover
 */

/**
 * Initializes infinite sliders on the page
 */
export function initInfiniteSliders() {
    const sliders = document.querySelectorAll(".inf-slider");
  
    sliders.forEach((slider) => {
      const options = {
        slideWidth: slider.dataset.infSlideWidth || "420px",
        animationSpeed: slider.dataset.infAnimationSpeed || "60s",
        direction: slider.dataset.infDirection === "reverse" ? "reverse" : "normal",
        pauseOnHover: slider.dataset.infSlidePauseOnHover === "true",
      };
  
      const track = slider.querySelector(".inf-slide-track");
      if (!track) return;
  
      const slides = track.getElementsByClassName("inf-slide");
      const numSlides = slides.length;
  
      // Set CSS variables
      slider.style.setProperty("--num-slides", numSlides.toString());
      slider.style.setProperty("--slide-width", options.slideWidth);
      slider.style.setProperty("--animation-speed", options.animationSpeed);
  
      // Apply width to each slide and clone slides
      Array.from(slides).forEach((slide) => {
        slide.style.width = options.slideWidth;
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
      });
  
      // Set track width
      track.style.width = `calc(var(--slide-width) * var(--num-slides) * 2)`;
  
      // Set animation
      const animationName = `inf-scroll${options.direction === "reverse" ? "-reverse" : ""}`;
      track.style.animation = `${animationName} var(--animation-speed) linear infinite`;
  
      // Add pause on hover functionality
      if (options.pauseOnHover) {
        slider.addEventListener("mouseenter", () => {
          track.style.animationPlayState = "paused";
        });
  
        slider.addEventListener("mouseleave", () => {
          track.style.animationPlayState = "running";
        });
      }
    });
  }