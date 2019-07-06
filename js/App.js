/**
 * Class which is Entry point of the application 
 * @example 
 * new App({containerId:"app"}).init();
 */
class App {

  /**
   * 
   * @param {String} containerId Id of the container whare app is created 
   */
  constructor({
    containerId
  }) {
    this.id = containerId;
    this.container = document.querySelector(`#${this.id}`);
    this.slides = [];
    this.slideIndex = 1;
    this.slideData = [];
    this.isFullScreen = false;

  }
  /**
   * Initilize the application
   */
  init() {

    this.header = new Header(this.container).init();
    let headerHeight = this.header.headerContainer.offsetHeight;
    this.slideContainer = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "container clearfix",
      },
      style: {
        height: `${window.innerHeight-headerHeight-20}px`
      }
    });

    this.slideList = createElementAndAppend({
      parentElem: this.slideContainer,
      attr: {
        class: "slide-list",
      }
    });


    // Create new slide on click 
    this.header.createNewSlideBtn.addEventListener("click", (e) => {
      this.makeNewSlide();
    });

    //Create new elenet on click
    this.header.insertElement.addEventListener("click", (e) => {
      this.makeNewElement();
    })

    // Loading exported data
    DATA.map(data => {
      this.makeNewSlide(data);
    });


    this.makeNewSlide();
  }


  /**
   * A funtion to create new slide if "data" is passed exiting slide will be created 
   * otherwise it create the empty slide
   * @param  {Object} [data] Imported data
   * 
   */
  makeNewSlide(data) {
    this.slideData[this.slideIndex - 1] = {};
    this.newSlide = new Slide({
      container: this.slideContainer,
      toolbar: this.header,
      slideIndex: this.slideIndex,
      slideData: this.slideData,
      exportedData: data
    }).init();

    this.slideIndex++;
    this.slides.push(this.newSlide);

    // Create list that appear on left side after creating new slide
    this.makeSlideList();

  }


  /**
   * A function which clone the slide body and make a list to show in left side
   */
  makeSlideList() {

    // Cloning thumbnailSlideBody for list

    let thumbnailSlideBody = this.newSlide.slideBody.cloneNode(true);
    let activeSlide = document.querySelector(".activeSlide");

    let thumbnailStyle = {
      width: window.getComputedStyle(activeSlide).width,
      height: window.getComputedStyle(activeSlide).height,
      transformOrigin: "top left",
      left: "50%",
      top: "50%",
      display: "block",
      transform: "scale(0.17) translate(-50%,-50%)"
    }

    styleElement(thumbnailSlideBody, thumbnailStyle);

    let thumbnail = createElementAndAppend({
      parentElem: this.slideList,
      attr: {
        class: 'thumbnail'
      }
    });

    let activeThumb = document.querySelector(".thumbnail.active");
    activeThumb && activeThumb.classList.remove("active");
    thumbnail.classList.add("active");

    activeSlide && activeSlide.classList.remove("activeSlide");
    document.querySelector(`#slide-${this.slideIndex-1}`).classList.add("activeSlide");


    // Adding click event to change slide 
    thumbnailSlideBody.addEventListener("click", (e) => {

      let id = e.currentTarget.getAttribute("dataslideindex");

      activeThumb = document.querySelector(".thumbnail.active");

      activeThumb && activeThumb.classList.remove("active");
      thumbnail.classList.add("active");

      activeSlide = document.querySelector(".activeSlide");
      activeSlide.classList.remove("activeSlide");
      document.querySelector(`#slide-${id}`).classList.add("activeSlide");

    })

    thumbnail.appendChild(thumbnailSlideBody);

    // removing contenteditable attribute on slide list
    let allContentEditAble = thumbnailSlideBody.querySelectorAll("[contenteditable='true']");
    allContentEditAble.forEach(elem => {
      elem.removeAttribute("contenteditable");
    });
  }


  /**
   * A function which handle the creatation of new element on the active slide on click 
   * @param  {String} [elemType] Type of element  
   */
  makeNewElement(elemType) {

    let activeSlide = document.querySelector(".activeSlide");

    let slideIndex = activeSlide.querySelector(".slide-body").getAttribute("dataslideindex");

    let slideWrapper = activeSlide.querySelector(".main-content");

    let elemId = slideWrapper.children.length + 1;

    this.slideData[slideIndex - 1][`elem${elemId}`] = {};

    new Element({
      elemType,
      slideIndex,
      slideData: this.slideData,
      parentElem: slideWrapper,
      elemId,
      createNewElement: true,
      style: {
        position: "absolute",
        top: `${GAP_BETWEEN_ELEMENT/2}px`,
        minHeight: "30px",
        height: DEFAULT_ELEMENT_HEIGHT + "px",
        width: "95%",
        fontSize: document.querySelector("#fontSize").value
      }
    }).init();

  }

}


new App({
  containerId: "app"
}).init();
