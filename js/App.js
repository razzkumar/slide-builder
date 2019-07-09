/**
 * Class which is Entry point of the application 
 * @example 
 * new App({containerId:"app"}).init();
 */
class App {

  /**
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
    this.presentationData = [];
    this.isFullScreen = false;
  }
  /**
   * Initilize the application
   */
  init() {

    this.header = new Header(this.container).init();

    this.slideMainContainer = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "container clearfix",
      }
    });

    this.slideList = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-list",
      }
    });

    this.slideWrapper = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-wrapper",
      }
    });

    this.styleContainers();

    window.addEventListener("resize", this.styleContainers.bind(this));

    // TODO
    // Create notification container 

    // Create new slide on click 
    this.header.createNewSlideBtn.addEventListener("click", (e) => {
      this.makeNewSlide();
      this.header.handleDropdownMenu("hide");
    });

    //Create new element on click
    this.header.insertElement.addEventListener("click", (e) => {
      this.makeNewElement();
      this.header.handleDropdownMenu("hide");
    })

    //Insert new image
    this.header.insertImage.addEventListener("click", (e) => {
      this.makeNewElement("img");
      this.header.handleDropdownMenu("hide");
    })

    //Insert new video
    this.header.insertVideo.addEventListener("click", e => {
      this.makeNewElement("video");
      this.header.handleDropdownMenu("hide");
    })

    // Loading exported data
    DATA && DATA.map((data, i) => {

      this.slideData[i] = {
        ...data
      };
      //debugger;

      this.makeNewSlide(data);
    });

    // new slide
    this.makeNewSlide();


    // handle presentation mode
    this.header.playBtn.addEventListener("click", this.presentationModeHandler.bind(this));
  }

  styleContainers() {

    let headerHeight = parseInt(this.header.headerContainer.offsetHeight);
    let height = parseInt(screen.availHeight) - headerHeight - GAP_BETWEEN_ELEMENT - COMMENT_CONTAINER_HEIGHT;

    this.slideMainContainer.style.height = `${height}px`;
    this.slideWrapper.style.height = `${height}px`;

    let slideBodies = document.querySelectorAll(".slide .slide-body");
    slideBodies && slideBodies.length > 0 && slideBodies.forEach(sBody => {
      let sbHeight = height - COMMENT_CONTAINER_HEIGHT - GAP_BETWEEN_ELEMENT
      sBody.style.height = sbHeight + "px";
      sBody.querySelector(".main-content").style.height = sbHeight - TITLE_CONTAINER_MIN_HEIGHT + "px"
    })

  }



  /**
   * A funtion to create new slide if "data" is passed exiting slide will be created 
   * otherwise it create the empty slide
   * @param  {Object} [data] Imported data
   */
  makeNewSlide(data) {

    if (!data) {
      //debugger;
      this.slideData[this.slideIndex - 1] = {};
    }
    this.newSlide = new Slide({
      container: this.slideWrapper,
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
      },
      style: {
        position: 'relative'
      }
    });

    //Creating delete botton
    let deleteBtn = createElementAndAppend({
      parentElem: thumbnail,
      elemType: "i",
      attr: {
        class: "fa fa-remove delete"
      },
      style: {
        position: "absolute",
        right: "8px",
        top: "4px",
        lineHeight: "20px",
      }
    })

    // Delete event and event handler is on util.js
    deleteBtn.addEventListener("click", this.deleteSlide)


    let activeThumb = document.querySelector(".thumbnail.active");
    activeThumb && activeThumb.classList.remove("active");
    thumbnail.classList.add("active");

    activeSlide && activeSlide.classList.remove("activeSlide");
    document.querySelector(`#slide-${this.slideIndex-1}`).classList.add("activeSlide");

    let elemRotator = thumbnailSlideBody.querySelector(".elem-rotator");
    elemRotator.parentElement.removeChild(elemRotator)
    let dragger = thumbnailSlideBody.querySelector(".dragger");
    dragger.parentElement.removeChild(dragger)
    let resizer = thumbnailSlideBody.querySelector(".resizer");
    resizer.parentElement.removeChild(resizer)

    // Adding click event to change slide 
    thumbnailSlideBody.addEventListener("click", (e) => {

      let id = e.currentTarget.getAttribute("dataslideindex");
      activeThumb = document.querySelector(".thumbnail.active");
      activeThumb && activeThumb.classList.remove("active");
      thumbnail.classList.add("active");

      activeSlide = document.querySelector(".activeSlide");
      activeSlide && activeSlide.classList.remove("activeSlide");
      document.querySelector(`#slide-${id}`).classList.add("activeSlide");

    });

    // removing contenteditable attribute on slide list
    let allContentEditAble = thumbnailSlideBody.querySelectorAll("[contenteditable='true']");
    allContentEditAble.forEach(elem => {
      elem.removeAttribute("contenteditable");
    });

    // appending on list

    thumbnail.appendChild(thumbnailSlideBody);
    this.presentationData.push(thumbnailSlideBody);
  }


  /**
   * A function which handle the creatation of new element on the active slide on click 
   * @param  {String} [elemType] Type of element  
   */
  makeNewElement(elemType) {

    let activeSlide = document.querySelector(".activeSlide");
    let slideIndex = parseInt(activeSlide.querySelector(".slide-body").getAttribute("dataslideindex"));
    let mainContent = activeSlide.querySelector(".main-content");
    let elemId = mainContent.children.length + 1;

    this.slideData[slideIndex - 1][`elem${elemId}`] = {};

    let params = {
      slideIndex,
      elemType,
      slideData: this.slideData,
      parentElem: mainContent,
      elemId,
      createNewElement: true,
      style: elemType === "img" ? {
        position: "absolute",
        height: "300px",
        width: "50%",
      } : {
        position: "absolute",
        height: DEFAULT_ELEMENT_HEIGHT + "px",
        width: "95%",
        fontSize: document.querySelector("#fontSize").value
      }
    }
    new Element(params).init();
  }

  /**
   * A callback function that handle the delete slide
   * @param  {Event} {currentTarget}  Destructuring and geting currentTarget from event
   */
  deleteSlide = ({
    currentTarget
  }) => {
    let thumbnail = currentTarget.parentElement;

    let nextSibling = thumbnail.nextSibling;
    let previousSibling = thumbnail.previousSibling;

    let activeSlide = document.querySelector(".slide.activeSlide");
    let activeSlideIndex = activeSlide.querySelector(".slide-body").getAttribute("dataslideindex");

    if (nextSibling) {
      nextSibling.classList.add("active");
      activeSlide.nextSibling.classList.add("activeSlide");
    } else if (previousSibling) {
      previousSibling.classList.add("active");
      activeSlide.previousSibling.classList.add("activeSlide");
    } else {
      // Removing thumbnail container at last
      thumbnail.parentElement.parentElement.removeChild(thumbnail.parentElement);
    }

    this.slideData = this.slideData.filter(d => parseInt(d.elemTitle.slideIndex) !== parseInt(activeSlideIndex));

    thumbnail.parentElement.removeChild(thumbnail);
    activeSlide.parentElement.removeChild(activeSlide);
  }
}


new App({
  containerId: "app"
}).init();
