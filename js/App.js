// All style (__Style let) are stored on style.js

class App {
  constructor(data) {
    this.id = data.id;
    this.container = document.querySelector(`#${this.id}`);
    this.slides = [];
    this.slideIndex = 1;
    this.slideData = {};
    this.isFullScreen = false;
  }

  setup() {

    this.header = new Header(this.container).setup();
    let headerHeight = this.header.offsetHeight;

    let slideContainerStyle = {
      height: `${window.innerHeight-headerHeight-20}px`
    };

    let slideContainer = createElementAndAppend(this.container, "div", {
      class: "container clearfix",
    }, null, slideContainerStyle);

    let slideList = createElementAndAppend(slideContainer, 'div', {
      class: "slide-list",
    });

    this.slideData[`slide${this.slideIndex}`] = {};

    let firstSlide = new Slide(slideContainer, this.header, this.slideIndex, this.slideData).setup();

    // Cloning slideBody for list
    let slideBody = firstSlide.slideBody.cloneNode(true);
    styleElement(slideBody, {
      width: window.getComputedStyle(firstSlide.slideBody).width,
      height: window.getComputedStyle(firstSlide.slideBody).height,
      transformOrigin: "top left",
      left: "50%",
      transform: "scale(0.22) translateX(-50%)"
    });

    slideList.appendChild(slideBody);

    // removing contenteditable attribute on slide list

    let allContentEditAble = slideBody.querySelectorAll("[contenteditable='true']");
    allContentEditAble.forEach(elem => {
      elem.removeAttribute("contenteditable");
    })

    this.slideIndex++;
    this.slides.push(firstSlide);

    document.addEventListener('fullscreenchange', () => {
      if (this.isFullScreen) {
        this.isFullScreen = false;
        let elem = document.querySelector(".slide-wrapper #slide1");
        let allContentEditAble = elem.querySelectorAll("[contenteditable='false']");
        allContentEditAble.forEach(elem => {
          elem.setAttribute("contenteditable", "true");
        })

      } else {
        this.isFullScreen = true;
      }
    });
  }
}


new App({
  id: "app"
}).setup();;
