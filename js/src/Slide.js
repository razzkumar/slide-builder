class Slide {

  constructor(params) {
    this.container = params.container;
    this.toolbar = params.toolbar;
    this.slideIndex = params.slideIndex;
    this.slideData = params.slideData;
    this.exportedData = params.exportedData;
    this.elementCount = 1;
  }

  setup() {

    let slideWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: this.slideIndex === 1 ? "slide-wrapper activeSlide" : "slide-wrapper",
        id: `slide-${this.slideIndex}`
      }
    });
    this.slideBody = createElementAndAppend({
      parentElem: slideWrapper,
      attr: {
        class: "slide-body",
        dataSlideIndex: this.slideIndex
      }
    });

    // UserNote
    this.slideData[this.slideIndex - 1][`elemUserNote`] = {};
    new SlideElement({
      elemType: "div",
      slideIndex: this.slideIndex,
      slideData: this.slideData,
      parentElem: slideWrapper,
      innerHTML: "",
      elemId: "UserNote",
      attr: {
        class: 'user-note',
        title: 'Note of the Slide',
        id: `slide${this.slideIndex}ElementUserNote`,
        contenteditable: true,
      },
      style: {
        height: COMMENT_CONTAINER_HEIGHT + "px"
      },
    }).setup();

    // Slide title
    this.slideData[this.slideIndex - 1][`elemTitle`] = {};

    let slideTitle = new SlideElement({
      parentElem: this.slideBody,
      slideIndex: this.slideIndex,
      elemId: "Title",
      attr: {
        class: 'title',
        title: 'Title of the Slide',
        contenteditable: true,
        id: `slide${this.slideIndex}ElementTitle`,
        placeholder: "Enter Title here..."
      },
      style: {
        fontSize: "48px",
        minHeight: TITLE_CONTAINER_MIN_HEIGHT + "px",
        padding: "10px"
      },
      slideData: this.slideData,
    }).setup();


    let contentWrapperHeight = this.container.offsetHeight - TITLE_CONTAINER_MIN_HEIGHT - COMMENT_CONTAINER_HEIGHT - 22; // 10+10 top and down margin

    let slideContentWrapper = createElementAndAppend({
      parentElem: this.slideBody,
      attr: {
        class: "main-content"
      },
      style: {
        height: contentWrapperHeight + "px"
      }
    });
    let activeSlide = document.querySelector(".activeSlide");
    let commonParameters = {
      parentElem: slideContentWrapper,
      elemId: this.elementCount,
      slideIndex: this.slideIndex,
      slideData: this.slideData,
      createNewElement: true,
      style: {
        position: "absolute",
        top: `${GAP_BETWEEN_ELEMENT/2}px`,
        minHeight: "30px",
        height: activeSlide.clientHeight / 3 + "px",
        width: activeSlide.clientWidth - GAP_BETWEEN_ELEMENT * 2 + "px",
        maxWidth: activeSlide.clientWidth - GAP_BETWEEN_ELEMENT + "px",
        fontSize: document.querySelector("#fontSize").value
      }
    };


    this.slideData[this.slideIndex - 1][`elem${this.elementCount}`] = {};

    let defaultElement = new SlideElement({
      ...commonParameters,
      elemId: this.elementCount
    }).setup();
    this.elementCount++;

    return this;
  }
}
