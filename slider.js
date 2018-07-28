/**
* A simple JavaScript library, to display a content slider
*
* @author Matthias Thalmann (https://github.com/m-thalmann/)
* @license MIT
*/

var Slider = (function(){
  var delay = 5; //seconds
  var sliders = [];

  const DEFAULT_ICONS = {
    pause: "<span>&#9654;</span>",
    play: "<span>&#9208;</span>",
    next: "<span>&gt</span>",
    prev: "<span>&lt</span>"
  };

  function getProperty(options, opt, def){
    if(typeof options[opt] === "undefined"){
      return def;
    }else{
      return options[opt];
    }
  }

  function Slider(container, options){
    var self = this;

    if(typeof container === "undefined"){
      throw new Error("Parameter 1 must be set");
    }

    if(typeof container === "string"){
      container = document.getElementById(container);

      if(typeof container === "undefined"){
        throw new Error("The container was not found");
      }
    }else if(!(container instanceof Node)){
      throw new Error("Parameter 1 must be either string or DOM-Node");
    }

    if(typeof options === "undefined"){
      options = {};
    }else if(typeof options !== "object"){
      throw new Error("Parameter 2 must be object");
    }

    this.container = container;
    this.slides = [];
    var timeout = null;
    var current = -1;

    var controls = {};

    this.prev = function(amount){
      if(typeof amount === "undefined"){
        amount = 1;
      }

      if(amount <= 0){
        return;
      }

      var pos = current - amount;

      if(pos < 0){
        pos = this.slides.length - 1;
      }

      getProperty(options.events, "prev", function(){})();
      self.showSlide(pos);
    };

    this.next = function(amount){
      if(typeof amount === "undefined"){
        amount = 1;
      }

      if(amount <= 0){
        return;
      }

      var pos = current + amount;

      if(pos >= this.slides.length){
        pos = 0;
      }

      getProperty(options.events, "next", function(){})();
      self.showSlide(pos);
    };

    this.showSlide = function(num){
      if(typeof num === "undefined"){
        amount = 0;
      }

      if(this.slides[num]){
        if(options.playing){
          self.resetTimeout();
        }

        getProperty(options.events, "change_slide", function(){})(num, this.slides[num]);

        current = num;

        for(var i = 0; i < this.slides.length; i++){
          this.slides[i].classList.remove("active");

          if(controls.indicators_list){
            controls.indicators_list[i].classList.remove("active");
          }
        }

        this.slides[num].classList.add("active");
        if (controls.indicators_list) {
          controls.indicators_list[num].classList.add("active");
        }

        if(controls.slides_container){
          controls.slides_container.style.left = "-" + (100 * parseInt(num)) + "%";
        }

        if(controls.indicator_select){
          controls.indicator_select.selectedIndex = num;
        }
      }
    };

    this.pause = function(){
      if(timeout){
        clearTimeout(timeout);
        timeout = null;
      }

      options.playing = false;

      if(controls.pause){
        controls.pause.innerHTML = getProperty(options, "play_icon", DEFAULT_ICONS.pause);
      }

      getProperty(options.events, "pause", function(){})();
    }

    this.play = function(){
      self.resetTimeout();

      options.playing = true;

      if(controls.pause){
        controls.pause.innerHTML = getProperty(options, "pause_icon", DEFAULT_ICONS.play);
      }

      getProperty(options.events, "play", function(){})();
    }

    this.togglePlay = function(){
      if(timeout){
        self.pause();
      }else{
        self.play();
      }

      getProperty(options.events, "toggle_play", function(){})();
    }

    this.isPlaying = function(){
      return !!timeout;
    };

    this.resetTimeout = function(){
      if(timeout){
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        if(getProperty(options, "play_direction", Slider.FORWARDS) == Slider.BACKWARDS){
          self.prev();
        }else{
          self.next();
        }
      }, delay * 1000);
    };

    this.showUI = function(level){
      if(level instanceof Array){
        controls.prev.classList.add("hidden");
        controls.next.classList.add("hidden");
        controls.pause.classList.add("hidden");
        controls.indicators.classList.add("hidden");

        for(var i = 0; i < level.length; i++){
          switch(level[i]){
            case Slider.UI.PREV:{
              controls.prev.classList.remove("hidden");
              break;
            }
            case Slider.UI.NEXT:{
              controls.next.classList.remove("hidden");
              break;
            }
            case Slider.UI.PAUSE:{
              controls.pause.classList.remove("hidden");
              break;
            }
            case Slider.UI.INDICATORS:{
              controls.indicators.classList.remove("hidden");
              break;
            }
          }
        }
      }else if(typeof level === "number"){
        self.showUI([level]);
      }else if(typeof level === "boolean"){
        if(level){
          self.showUI([Slider.UI.PREV, Slider.UI.NEXT, Slider.UI.PAUSE, Slider.UI.INDICATORS]);
        }else{
          self.showUI([]);
        }
      }else{
        self.showUI(true);
      }
    };

    this.updateView = function(){
      container.innerHTML = "";

      var cnt_slides = document.createElement("div");
      cnt_slides.className = "slides";

      for(var i = 0; i < self.slides.length; i++){
        cnt_slides.appendChild(self.slides[i]);
      }

      controls.slides_container = cnt_slides;
      container.appendChild(cnt_slides);

      var btn_prev = document.createElement("div");
      btn_prev.className = "slider_btn_nav slider_btn_prev slider_controls";
      btn_prev.innerHTML = getProperty(options, "prev_icon", DEFAULT_ICONS.prev);
      btn_prev.addEventListener("click", function () {
        self.prev();
      });

      controls.prev = btn_prev;

      var btn_next = document.createElement("div");
      btn_next.className = "slider_btn_nav slider_btn_next slider_controls";
      btn_next.innerHTML = getProperty(options, "next_icon", DEFAULT_ICONS.next);
      btn_next.addEventListener("click", function () {
        self.next();
      });

      controls.next = btn_next;

      var btn_pause = document.createElement("div");
      btn_pause.className = "slider_btn_pause slider_controls";
      btn_pause.addEventListener("click", function () {
        self.togglePlay();
      });

      controls.pause = btn_pause;

      var cnt_indicators = document.createElement("div");
      cnt_indicators.className = "slider_indicators slider_controls";

      controls.indicators = cnt_indicators;

      controls.indicators_list = [];

      var select_indicator = document.createElement("select");
      select_indicator.className = "slider_indicator_select";
      select_indicator.onchange = function(){
        self.showSlide(this.value);
      };

      var indicator_icon = getProperty(options, "indicator_icon", "");
      for (var i = 0; i < self.slides.length; i++) {
        (function (i_tmp) {
          var indicator = document.createElement("div");
          indicator.className = "slider_indicator";

          if (indicator_icon != "") {
            indicator.innerHTML = indicator_icon;
          } else {
            indicator.classList.add("slider_indicator_icon");
          }

          indicator.addEventListener("click", function () {
            self.showSlide(i_tmp);
          });

          controls.indicators_list.push(indicator);

          cnt_indicators.appendChild(indicator);

          var option_indicator = document.createElement("option");
          option_indicator.value = i_tmp;
          option_indicator.innerHTML = (i_tmp + 1);

          if(current == -1 && i_tmp == 0){
            option_indicator.selected = "true";
          }else if(current == i_tmp){
            option_indicator.selected = "true";
          }

          select_indicator.appendChild(option_indicator);
        }(i));
      }

      controls.indicator_select = select_indicator;
      
      container.appendChild(btn_prev);
      container.appendChild(btn_next);
      container.appendChild(btn_pause);
      container.appendChild(cnt_indicators);
      container.appendChild(select_indicator);

      if(current == -1){
        self.showSlide(getProperty(options, "start_slide", 0));
      }else{
        self.showSlide(current);
      }

      options.playing = getProperty(options, "playing", true);

      if(options.playing){
        self.play();
      }else{
        self.pause();
      }

      // Load images
      var imgs = cnt_slides.getElementsByTagName('img');

      for(var i = 0; i < imgs.length; i++){
        if(imgs[i].getAttribute("data-src-async")){
          imgs[i].src = imgs[i].getAttribute("data-src-async");
        }
      }
    };

    // Init
    (function(){
      var slds = container.getElementsByClassName('slide');

      for(var i = 0; i < slds.length; i++){
        self.slides.push(slds[i]);
      }

      container.classList.add("slider");

      if(typeof options.events !== "object"){
        options.events = {};
      }

      self.updateView();

      if(!getProperty(options, "show_ui", true)){
        self.showUI(false);
      }

      getProperty(options.events, "load", function(){})(controls.slides_container);
    }());

    sliders.push(this);
  }

  Slider.setDelay = function(_delay){
    if(typeof _delay === "number"){
      delay = _delay;

      for(var i = 0; i < sliders.length; i++){
        sliders[i].resetTimeout();
      }
    }else{
      console.warn("Parameter 1 must be a number");
    }
  };

  Slider.getDelay = function(){
    return delay;
  }

  Slider.FORWARDS = "play_direction_next";
  Slider.BACKWARDS = "play_direction_prev";

  Slider.UI = {
    PREV: 0,
    NEXT: 1,
    PAUSE: 2,
    INDICATORS: 3,
  };

  return Slider;
}());

/*
IDEA: Integration with pan event
*/
