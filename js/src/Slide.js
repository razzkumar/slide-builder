class Slide {

  constructor(container, toolbar, slideIndex, slideData) {
    this.container = container;
    this.toolbar = toolbar;
    this.slideIndex = slideIndex;
    this.slideData = slideData;
    this.elementCount = 1;
  }

  setup() {

    let slideWrapper = createElementAndAppend(this.container, "div", {
      class: "slide-wrapper"
    }, null, {
      height: "100%"
    });

    this.slideBody = createElementAndAppend(slideWrapper, "div", {
      class: "slide-body",
      id: `slide${this.slideIndex}`
    });

    this.slideData[`slide${this.slideIndex}`][`elemUserNote`] = {};

    // UserNote
    new SlideElement(slideWrapper, "div", 1, "UserNote", {
      class: 'user-note',
      title: 'Note of the Slide',
      id: `slide${this.slideIndex}ElementUserNote`,
      contenteditable: true,
    }, {
      height: COMMENT_CONTAINER_HEIGHT + "px"
    }, this.slideData).setup();

    this.slideData[`slide${this.slideIndex}`][`elemTitle`] = {};

    let slideTitle = new SlideElement(this.slideBody, "div", 1, "Title", {
      class: 'title',
      title: 'Title of the Slide',
      contenteditable: true,
      id: `slide${this.slideIndex}ElementTitle`,
      placeholder: "Enter Title here..."
    }, {
      fontSize: "48px"
    }, this.slideData).setup();


    let contentWrapperHeight = this.container.offsetHeight - slideTitle.offsetHeight - COMMENT_CONTAINER_HEIGHT - 20; // 10+10 top and down margin

    let slideContentWrapper = createElementAndAppend(this.slideBody, "div", {
      class: "main-content"
    }, null, {
      height: contentWrapperHeight + "px"
    });


    this.slideData[`slide${this.slideIndex}`][`elem${this.elementCount}`] = {};
    let defaultElement = new SlideElement(slideContentWrapper, "div", 1, this.elementCount, null, null, this.slideData).setup();
    this.elementCount++;

    this.slideData[`slide${this.slideIndex}`][`elem${this.elementCount}`] = {};
    let secondElement = new SlideElement(slideContentWrapper, "div", 1, this.elementCount, null, null, this.slideData).setup();

    this.elementCount++;
    this.slideData[`slide${this.slideIndex}`][`elem${this.elementCount}`] = {};
    let secondElement1 = new SlideElement(slideContentWrapper, "div", 1, this.elementCount, null, null, this.slideData).setup();
    return this;
  }
}
