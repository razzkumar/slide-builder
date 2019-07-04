// All style (__Style let) are stored on style.js

class App {
  constructor(data) {
    this.id = data.id;
    this.container = document.querySelector(`#${this.id}`);
    this.slides = [];
    this.slideIndex = 1;
    this.slideData = [];
    this.isFullScreen = false;
  }

  setup() {
    this.header = new Header(this.container).setup();
    let headerHeight = this.header.offsetHeight;

    let slideContainerStyle = {
      height: `${window.innerHeight-headerHeight-20}px`
    };

    let slideContainer = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "container clearfix",
      },
      style: slideContainerStyle
    });

    let slideList = createElementAndAppend({
      parentElem: slideContainer,
      attr: {
        class: "slide-list",
      }
    });

    this.slideData[this.slideIndex - 1] = {};

    let firstSlide = new Slide({
      container: slideContainer,
      toolbar: this.header,
      slideIndex: this.slideIndex,
      slideData: this.slideData
    }).setup();

    // Cloning slideBody for list

    let slideBody = firstSlide.slideBody.cloneNode(true);

    let activeSlide = document.querySelector(".activeSlide");

    let thumbnailStyle = {
      width: window.getComputedStyle(activeSlide).width,
      height: window.getComputedStyle(activeSlide).height,
      transformOrigin: "top left",
      left: "50%",
      display: "block",
      transform: "scale(0.22) translateX(-50%)"
    }

    styleElement(slideBody, thumbnailStyle);

    let thumbnail = createElementAndAppend({
      parentElem: slideList,
      style: {
        height: "20vh",
      }
    });

    let thumbnail2 = createElementAndAppend({
      parentElem: slideList,
      style: {
        height: "20vh"
      }
    });

    thumbnail.appendChild(slideBody);

    // removing contenteditable attribute on slide list

    let allContentEditAble = slideBody.querySelectorAll("[contenteditable='true']");
    allContentEditAble.forEach(elem => {
      elem.removeAttribute("contenteditable");
    })

    this.slideIndex++;
    this.slides.push(firstSlide);

    // second slide 

    this.slideData[this.slideIndex - 1] = {};

    let secondSlide = new Slide({
      container: slideContainer,
      toolbar: this.header,
      slideIndex: this.slideIndex,
      slideData: this.slideData
    }).setup();

    // Cloning slideBody for list
    let secondSlideBody = secondSlide.slideBody.cloneNode(true);

    styleElement(secondSlideBody, thumbnailStyle);

    thumbnail2.appendChild(secondSlideBody);

    // removing contenteditable attribute on slide list

    let allContentEditAbleof2 = secondSlideBody.querySelectorAll("[contenteditable='true']");
    allContentEditAbleof2.forEach(elem => {
      elem.removeAttribute("contenteditable");
    })

    this.slideIndex++;
    this.slides.push(secondSlide);

    document.addEventListener('fullscreenchange', () => {
      let elem = document.querySelector(".slide-wrapper #slide-1");

      if (this.isFullScreen) {
        elem.classList.remove("fullscreen");
        this.isFullScreen = false;
        let allContentEditAble = elem.querySelectorAll("[contenteditable='false']");
        allContentEditAble.forEach(elem => {
          elem.setAttribute("contenteditable", "true");
        })

      } else {
        elem.classList.add("fullscreen");
        this.isFullScreen = true;
      }
    });
  }
}


new App({
  id: "app"
}).setup();;
