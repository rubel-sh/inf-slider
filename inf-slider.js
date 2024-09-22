export function initInfiniteSliders() {
  const sliders = document.querySelectorAll(".inf-slider");

  sliders.forEach((slider) => {
    const options = {
      scrollSpeed: slider.dataset.infScrollSpeed || "100", // Default scroll speed 100px/s
      direction: slider.dataset.infDirection === "reverse" ? "reverse" : "normal",
      pauseOnHover: slider.dataset.infSlidePauseOnHover === "true",
    };

    const track = slider.querySelector(".inf-slide-track");
    if (!track) return;

    const slides = track.getElementsByClassName("inf-slide");
    const numSlides = slides.length;

    if (numSlides === 0) return;

    // Calculate total width of all slides
    let totalWidth = 0;
    const slideWidths = [];

    Array.from(slides).forEach((slide) => {
      const width = slide.offsetWidth;
      slideWidths.push(width);
      totalWidth += width;
    });

    // Clone slides
    Array.from(slides).forEach((slide, index) => {
      const clone = slide.cloneNode(true);
      clone.style.width = `${slideWidths[index]}px`; // Set explicit width on clones
      track.appendChild(clone);
    });

    // Set track width to accommodate all slides (original + cloned)
    track.style.width = `${totalWidth * 2}px`;

    // Calculate animation duration based on scrollSpeed (pixels per second)
    const scrollSpeed = parseFloat(options.scrollSpeed);
    const animationDuration = (totalWidth * 2) / scrollSpeed; // time = distance / speed

    // Create a custom property with all slide widths
    const slideWidthsString = slideWidths.join("px ") + "px";
    slider.style.setProperty("--slide-widths", slideWidthsString);

    // Set the animation with calculated duration
    const animationName = `inf-scroll${options.direction === "reverse" ? "-reverse" : ""}`;
    track.style.animation = `${animationName} ${animationDuration}s linear infinite`;

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