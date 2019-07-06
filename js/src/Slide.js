class Slide {

  constructor(params) {
    this.container = params.container;
    this.toolbar = params.toolbar;
    this.slideIndex = params.slideIndex;
    this.slideData = params.slideData;
    this.exportedData = params.exportedData;
    this.elementCount = 1;
  }

  init() {

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

    let contentWrapperHeight = this.container.offsetHeight - TITLE_CONTAINER_MIN_HEIGHT - COMMENT_CONTAINER_HEIGHT - 22; // 10+10 top and down margin

    if (this.exportedData) {

      if (this.exportedData.elemTitle) {
        this.slideData[this.exportedData.elemTitle.slideIndex - 1][`elemTitle`] = {};
        this.createElement({
          slideData: this.slideData,
          parentElem: this.slideBody,
          ...this.exportedData.elemTitle
        })
      }

      if (this.exportedData.elemUserNote) {
        this.slideData[this.exportedData.elemUserNote.slideIndex - 1][`elemUserNote`] = {};
        this.createElement({
          slideData: this.slideData,
          parentElem: slideWrapper,
          ...this.exportedData.elemUserNote
        })
      }

      this.slideContentWrapper = createElementAndAppend({
        parentElem: this.slideBody,
        attr: {
          class: "main-content"
        },
        style: {
          height: contentWrapperHeight + "px"
        }
      });

      let elemCount = 1;

      while (this.exportedData[`elem${elemCount}`] && this.exportedData[`elem${elemCount}`].elemId) {

        this.createElement({
          parentElem: this.slideContentWrapper,
          slideData: this.slideData,
          ...this.exportedData[`elem${elemCount}`]
        });

        this.slideData[this.exportedData.elemUserNote.slideIndex - 1][`elem${elemCount}`] = {};
        elemCount++;
      }

    } else {
      // UserNote
      this.slideData[this.slideIndex - 1][`elemUserNote`] = {};
      new Element({
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
      }).init();

      // Slide title
      this.slideData[this.slideIndex - 1][`elemTitle`] = {};
      new Element({
        parentElem: this.slideBody,
        slideIndex: this.slideIndex,
        innerHTML: `Slide ${this.slideIndex} Title`,
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
      }).init();

      this.slideContentWrapper = createElementAndAppend({
        parentElem: this.slideBody,
        attr: {
          class: "main-content"
        },
        style: {
          height: contentWrapperHeight + "px"
        }
      });

      this.createElement({
        parentElem: this.slideContentWrapper,
        elemId: this.elementCount,
        slideIndex: this.slideIndex,
        slideData: this.slideData,
        createNewElement: true,
        style: {
          position: "absolute",
          top: `${GAP_BETWEEN_ELEMENT/2}px`,
          minHeight: "30px",
          height: DEFAULT_ELEMENT_HEIGHT + "px",
          width: "95%",
          maxWidth: "100%",
          fontSize: document.querySelector("#fontSize").value
        }
      });
    }
    return this;
  }

  createElement(commonParameters) {


    this.slideData[this.slideIndex - 1][`elem${this.elementCount}`] = {};

    new Element(commonParameters).init();
    this.elementCount++;

  }
}
