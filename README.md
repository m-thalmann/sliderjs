# sliderjs
A simple JavaScript library, to display a content slider

**Demo:** https://m.thalmann.bz.it/prod/sliderjs/demo.html

## Navigation
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Slider](#slider)
  - [Events](#events)
  - [Options](#options)
- [Example](#example)

## Installation
1. Download the .zip-File and put it in your project-folder.

2. Add this script-tag to the head of the file
```html
<script src="path/to/js/file.js"></script>
```

3. Add this link-tag to the head of the file, to include the styles
```html
<link rel="stylesheet" href="path/to/css/file.css" />
```

4. Start using the library!

## Usage
### Create slider-container
```html
<div class="slider" id="myslider">
  <div class="slide">
    <img src="images/1.jpg">
  </div>
  [...]
</div>
```

### Create new Slider
```javascript
var slider = new Slider("slider");
```

### Add slide
```javascript
var new_slide = document.createElement("div");
new_slide.className = "slide";
new_slide.innerHTML = "...";

slider.slides.push(new_slide); // Add slide to the slides
slider.updateView();           // Reload the slider
```

## Documentation
### Slider
It's the main object to display the slider.
#### Instanciating
```javascript
new Slider(container, options);
```
- **container** (DOM-Element/id): The container for the slider to display
- **options** (object): A object with options for the slider (see [below](#options)) **(optional)**

After the instanciation, the slider is reloaded/rendered

#### Class-Variables
```javascript
Slider.FORWARDS         // Is used to define which direction the slider goes
Slider.BACKWARDS        // - " -
Slider.UI               // Is used to define which UI-Elements are shown (showUI(...))
                        // -> PREV (the prev-button)
                        //    NEXT (the next-button)
                        //    PAUSE (the pause/play-button)
                        //    INDICATORS (the indicators at the bottom)
```

### Variables
```javascript
slider.container        // The container, where the slider is located (DOM-Object)
slider.slides           // The slides of the slider (can be updated, but you have to call
                        // slider.updateView() afterwards) (Array)
```

#### Class-Methods
```javascript
Slider.setDelay(delay); // Sets the duration a slide is displayed for each slider (Seconds) (default: 5)
Slider.getDelay();      // Returns the duration a slide is displayed (Seconds)
```

#### Methods
```javascript
slider.pause();         // Pauses the playback of the slider
slider.play();          // Starts the playback of the slider
slider.togglePlay();    // Toggles the playback of the slider
slider.isPlaying();     // Returns true if the slider is playing otherwise false

slider.prev(amount);    // Shows the previous slide. If amount is set it goes back for amount slides (integer optional)
slider.next(amount);    // Shows the next slide. If amount is set it goes forward for amount slides (integer optional)
slider.showSlide(pos);  // Shows a specific slide. If pos is not set it shows the first one (integer optional)

slider.resetTimeout();  // Resets the timeout for the current slide
slider.showUI(level);   // Shows a specific level of the UI. If level is not set or is true it shows the whole UI.
                        // If level is false or a empty array it hides the UI
                        // If level is a array with elements of the Slider.UI object, it shows those UI-Elements
                        // If level is only a Slider.UI element, it hides all UI-Elements except that one
                        // (boolean/integer/array/undefined)
slider.updateView();    // Updates the displayed slider
```

### Events
It is possible to attach a event to the slider (defining in options)

| Event | Callback-Parameter(s) | Definition |
|--------------|:---------------------:|----------------------------------------------------------------------------------------------------------------------|
| load | DOM-Object | Is fired when the slider is loaded; The parameter is the container of the slides |
| prev | - | Is fired when the slider shows a previous slide |
| next | - | Is fired when the slider shows a next slide |
| change_slide | integer, DOM-Object | Is fired when the slide is changed; The parameter 1 is the number of the new slide; The parameter 2 is the new slide |
| pause | - | Is fired when the slider is paused |
| play | - | Is fired when the slider is restarted |
| toggle_play | - | Is fired when the slider state (playing/not playing) is changed |

### Options
| Option | Values | Definition |
|:--------------:|:--------------------------------:|:----------------------------------------------:|
| play_icon | String | Sets the icon of the play button |
| pause_icon | String | Sets the icon of the pause button |
| play_direction | Slider.FORWARDS/Slider.BACKWARDS | Sets the direction of the playback |
| prev_icon | String | Sets the icon of the prev button |
| next_icon | String | Sets the icon of the next button |
| start_slide | integer | Sets the index of the start slide |
| playing | boolean | Sets if the slider is playing at the beginning |
| show_ui | boolean | Sets if the slider has a ui or not |
| events | object | Sets the events for the slider |

## Example
### Code:
```html
<div id="slider" style="max-height: 400px; width: 90%; max-width: 960px; margin: 0 auto">
  <div class="slide">
    <img src="" alt="" data-src-async="https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
  </div>
  [...]
</div>
```

```javascript
// Using fontawesome-icons
var slider = new Slider("slider", {
      play_icon: '<i class="fas fa-play"></i>',
      pause_icon: '<i class="far fa-pause-circle"></i>',
      prev_icon: '<i class="fas fa-angle-left"></i>',
      next_icon: '<i class="fas fa-angle-right"></i>'
    });
```

### Output:

![sliderJs example](demo/example.jpg)
