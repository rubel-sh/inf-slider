# Infinite Slider Component

A lightweight, customizable infinite scroll slider for web projects.

## Quick Start

### 1. Add HTML

   ```html
    <div class="inf-slider">
      <div class="inf-slide-track">
        <div class="inf-slide wide-slide">Wide Slide Content</div>
        <div class="inf-slide narrow-slide">Narrow Slide Content</div>
        <div class="inf-slide medium-slide">Medium Slide Content</div>
      </div>
    </div>
   ```

### 2. Add CSS

```css
@keyframes inf-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes inf-scroll-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.inf-slide-track {
  display: flex;
}

.inf-slide {
  flex-shrink: 0;
}

```

### 3. Add JS

```js
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
```

### 3. Initialize initInfiniteSliders()

```html
function initInfiniteSliders(): void {
  // Implementation details...
}

document.addEventListener('DOMContentLoaded', initInfiniteSliders);
```


# Infinite Slider Attributes Guide

This guide explains how to customize the Infinite Slider component using data attributes.

## Available Attributes

The Infinite Slider supports the following data attributes:

1. `data-inf-scroll-speed="120"`
2. `data-inf-direction="reverse || normal"`
3. `data-inf-slide-pause-on-hover="BOOLEAN"`


## Usage Example
Here's an example of how to use all these attributes together:

```html
<div class="inf-slider"
     data-inf-scroll-speed="30"
     data-inf-direction="reverse"
     data-inf-slide-pause-on-hover="true">
  <div class="inf-slide-track">
    <div class="inf-slide">Slide 1</div>
    <div class="inf-slide">Slide 2</div>
    <div class="inf-slide">Slide 3</div>
  </div>
</div>
```
