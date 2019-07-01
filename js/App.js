// All style (__Style let) are stored on style.js

class App {
  constructor(data) {
    this.id = data.id;
    this.container = document.querySelector(`#${this.id}`);
    this.slides = []
  }

  setup() {
    this.header = new Header(this.container).setup();
    let headerHeight = this.header.header.offsetHeight;
    let slideContainerStyle = {
      height: `${window.innerHeight-headerHeight-20}px`
    }
    let slideContainer = createElementAndAppend(this.container, "div", {
      class: "container clearfix",
    }, null, slideContainerStyle);
    let slideListContainer = createElementAndAppend(slideContainer, 'div', {
      class: "slide-list"
    })
    let firstSlide = new Slide(slideContainer, this.header).setup();

    this.slides.push(firstSlide);
  }
}


new App({
  id: "app"
}).setup();;
