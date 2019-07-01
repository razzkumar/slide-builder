class Slide {

  constructor(container, toolbar, slideIndex, data) {
    this.data = data;
    this.slideIndex = slideIndex;
    this.container = container;
    this.toolbar = toolbar;
    this.elementCount = 1;
  }

  setup() {

    let slideWrapper = createElementAndAppend(this.container, "div", {
      class: "slide-wrapper"
    }, null, {
      height: "100%"
    });

    let slideBody = createElementAndAppend(slideWrapper, "div", {
      class: "slide-body"
    });
    let comment = createElementAndAppend(slideWrapper, "div", {
      class: "user-note",
      contenteditable: true,
    }, "NOTE :", {
      height: COMMENT_CONTAINER_HEIGHT + "px"
    });

    let slideTitle = createElementAndAppend(slideBody, "div", {
      class: 'title',
      title: 'Title of the Slide',
      contenteditable: true,
      placeholder: "Enter Title here..."
    });

    slideTitle.addEventListener("input", function (e) {
      console.log("Input", e.target.innerText);
    }, false);



    let contentWrapperHeight = this.container.offsetHeight - slideTitle.offsetHeight - COMMENT_CONTAINER_HEIGHT - 20; // 10+10 top and down margin

    let slideContentWrapper = createElementAndAppend(slideBody, "div", {
      class: "main-content"
    }, null, {
      height: contentWrapperHeight + "px"
    });

    let defaultElement = new SlideElement(slideContentWrapper, "div", 1, this.elementCount).setup();
    console.log('defaultElement:', defaultElement)

    this.elementCount++;

    let secondElement = new SlideElement(slideContentWrapper, "div", 1, this.elementCount).setup();

    return this;
  }
}
