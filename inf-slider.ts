interface SliderOptions {
    slideWidth: string;
    animationSpeed: string;
    direction: "normal" | "reverse";
    pauseOnHover: boolean;
  }
  
  export function initInfiniteSliders(): void {
    const sliders: NodeListOf<HTMLElement> = document.querySelectorAll(".inf-slider");
  
    sliders.forEach((slider: HTMLElement) => {
      const options: SliderOptions = {
        slideWidth: slider.dataset.infSlideWidth || "420px",
        animationSpeed: slider.dataset.infAnimationSpeed || "60s",
        direction: (slider.dataset.infDirection === "reverse" ? "reverse" : "normal") as "normal" | "reverse",
        pauseOnHover: slider.dataset.infSlidePauseOnHover === "true",
      };
  
      const track: HTMLElement | null = slider.querySelector(".inf-slide-track");
      if (!track) return;
  
      const slides: HTMLCollectionOf<HTMLElement> = track.getElementsByClassName(
        "inf-slide"
      ) as HTMLCollectionOf<HTMLElement>;
      const numSlides: number = slides.length;
  
      // Set CSS variables
      slider.style.setProperty("--num-slides", numSlides.toString());
      slider.style.setProperty("--slide-width", options.slideWidth);
      slider.style.setProperty("--animation-speed", options.animationSpeed);
  
      // Apply width to each slide and clone slides
      Array.from(slides).forEach((slide: HTMLElement) => {
        slide.style.width = options.slideWidth;
        const clone: Node = slide.cloneNode(true);
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
  