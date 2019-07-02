// All style (__Style let) are stored on style.js

class App {
  constructor(data) {
    this.id = data.id;
    this.container = document.querySelector(`#${this.id}`);
    this.slides = [];
    this.slideIndex = 1;
    this.slideData = {};
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
    this.slideData[`slide${this.slideIndex}`] = {}
    let firstSlide = new Slide(slideContainer, this.header, this.slideIndex, this.slideData).setup();

    let a = firstSlide.slideBody.cloneNode(true);

    slideList.appendChild(a);

    this.slideIndex++;
    this.slides.push(firstSlide);
  }
}


new App({
  id: "app"
}).setup();;
