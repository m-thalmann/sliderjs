/**
* A simple JavaScript library, to display a content slider
*
* @author Matthias Thalmann (https://github.com/m-thalmann/)
* @license MIT
*/

var Slider = (function(){
  var delay = 5; //seconds
  var sliders = [];

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
    var timeout = null;
    var slides = [];
    var current = 0;

    var controls = {};

    this.prev = function(amount = 1){
      // TODO:
    };

    this.next = function(amount = 1){
      // TODO:
    };

    this.showSlide = function(num = 0){
      if(slides[num]){
        self.resetTimeout();
        // TODO: show slide
      }
    };

    // TODO: change icon
    this.pause = function(){
      if(timeout){
        clearTimeout(timeout);
      }

      if(controls.btn_pause){
        controls.btn_pause.innerHTML = getProperty(options, "next_icon", "<span>&#9654;</span>");
      }
    }

    // TODO: change icon
    this.play = function(){
      self.resetTimeout();

      if(controls.btn_pause){
        controls.btn_pause.innerHTML = getProperty(options, "next_icon", "<span>&#9208;</span>");
      }
    }

    this.togglePlay = function(){
      if(timeout){
        self.pause();
      }else{
        self.play();
      }
    }

    this.resetTimeout = function(){
      if(timeout){
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        self.next();
      }, delay * 1000);
    };

    // Init
    (function(){
      var slds = container.getElementsByClassName('slide');

      for(var i = 0; i < slds.length; i++){
        slides.push(slds[i]);
      }

      container.classList.add("slider");

      var btn_prev = document.createElement("div");
      btn_prev.className = "slider_btn_nav slider_btn_prev";
      btn_prev.innerHTML = getProperty(options, "prev_icon", "<span>&lt</span>");
      btn_prev.addEventListener("click", function(){
        self.prev();
      });

      controls.prev = btn_prev;

      var btn_next = document.createElement("div");
      btn_next.className = "slider_btn_nav slider_btn_next";
      btn_next.innerHTML = getProperty(options, "next_icon", "<span>&gt</span>");
      btn_next.addEventListener("click", function(){
        self.next();
      });

      controls.next = btn_next;

      var btn_pause = document.createElement("div");
      btn_pause.className = "slider_btn_pause";
      btn_pause.addEventListener("click", function(){
        self.togglePlay();
      });

      controls.pause = btn_pause;

      var cnt_indicators = document.createElement("div");
      cnt_indicators.className = "slider_indicators";

      controls.indicators = cnt_indicators;

      controls.indicators_list = [];

      var indicator_icon = getProperty(options, "indicator_icon", "&#149;");
      for(var i = 0; i < slides.length; i++){
        (function(){
          var i_temp = i;

          var indicator = document.createElement("div");
          indicator.className = "slider_indicator";
          indicator.innerHTML = indicator_icon;
          indicator.addEventListener("click", function(){
            self.showSlide(i_tmp);
          });

          controls.indicators_list.push(indicator);

          cnt_indicators.appendChild(indicator);
        }());
      }

      // TODO: add to container

      self.showSlide(getProperty(options, "start_slide", 0));

      if(getProperty(options, "playing", true)){
        self.play();
      }else{
        self.pause();
      }
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

  // TODO: functions for all

  return Slider;
}());

/*
TODO: add option to execute async function
TODO: function to hide ui
TODO: events; event for single slide (show_slide -> give num)
*/
