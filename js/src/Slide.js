class Slide {
  constructor(slideContainer, toolbar) {
    this.slideContainer = slideContainer
    this.slideWrapper = createElementAndAppend(slideContainer, "div", {
      class: "slide-wrapper"
    }, null, {
      height: "100%"
    });
    this.toolbar = toolbar;
    this.elementCount = 1;
  }
  setup() {
    let commentContainerHeight = 70;
    this.slideTitle = createElementAndAppend(this.slideWrapper, "div", {
      class: 'title',
      title: 'Title of the Slide',
      contenteditable: true,
      placeholder: "Enter Title here..."
    })
    let contentWrapperHeight = this.slideContainer.offsetHeight - this.slideTitle.offsetHeight - commentContainerHeight - 20; // 10+10 top and down margin
    this.slideContentWrapper = createElementAndAppend(this.slideWrapper, "div", {
      class: "main-content"
    }, null, {
      height: contentWrapperHeight + "px"
    })

    this.comment = createElementAndAppend(this.slideWrapper, "div", {
      class: "user-note",
      contenteditable: true,
    }, "NOTE :", {
      height: commentContainerHeight + "px"
    });

    let defaultEement = new SlideElement(this.slideContentWrapper, "div", 1, this.elementCount).setup();

    return this;
  }
}
