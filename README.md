# Infinite Slider Component

A lightweight, customizable infinite scroll slider for web projects.

## Quick Start

### 1. Add HTML

   ```html
   <div class="inf-slider" data-inf-slide-width="300px" data-inf-animation-speed="30s">
     <div class="inf-slide-track">
       <div class="inf-slide">Slide 1</div>
       <div class="inf-slide">Slide 2</div>
       <div class="inf-slide">Slide 3</div>
     </div>
   </div>
   ```

### 2. Add CSS
    ```css
    @keyframes inf-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-100% / 2)); }
    }

    @keyframes inf-scroll-reverse {
      0% { transform: translateX(calc(-100% / 2)); }
      100% { transform: translateX(0); }
    }

    .inf-slider {
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .inf-slide-track {
      display: flex;
      width: fit-content;
    }
```

### 3. Add JS
```js
function initInfiniteSliders() {
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

1. `data-inf-slide-width`
2. `data-inf-animation-speed`
3. `data-inf-direction`
4. `data-inf-slide-pause-on-hover`

## Attribute Details

### 1. data-inf-slide-width

- **Purpose**: Sets the width of each slide in the slider.
- **Default**: "420px"
- **Example**: `data-inf-slide-width="300px"`
- **Notes**: Can use any valid CSS width value (px, %, em, rem, etc.).

### 2. data-inf-animation-speed

- **Purpose**: Sets the duration of one complete cycle of the slider animation.
- **Default**: "60s"
- **Example**: `data-inf-animation-speed="30s"`
- **Notes**: Use time values in seconds (s) or milliseconds (ms).

### 3. data-inf-direction

- **Purpose**: Sets the direction of the slider animation.
- **Default**: "normal"
- **Valid Values**: "normal" or "reverse"
- **Example**: `data-inf-direction="reverse"`

### 4. data-inf-slide-pause-on-hover

- **Purpose**: Enables or disables the pause-on-hover functionality.
- **Default**: false (disabled)
- **Valid Values**: "true" or "false"
- **Example**: `data-inf-slide-pause-on-hover="true"`

## Usage Example

Here's an example of how to use all these attributes together:

```html
<div class="inf-slider"
     data-inf-slide-width="300px"
     data-inf-animation-speed="45s"
     data-inf-direction="reverse"
     data-inf-slide-pause-on-hover="true">
  <div class="inf-slide-track">
    <div class="inf-slide">Slide 1</div>
    <div class="inf-slide">Slide 2</div>
    <div class="inf-slide">Slide 3</div>
  </div>
</div>