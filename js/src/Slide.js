/**
 * class that represent a single slide
 */
class Slide {
  constructor(params) {
    this.container = params.container;
    this.toolbar = params.toolbar;
    this.slideIndex = params.slideIndex;

    this.slideData = params.slideData;
    this.exportedData = params.exportedData;
    this.elementCount = 1;
    this.theme = params.theme;
    this.themeColor = params.themeColor;
  }
  init() {

    let slide = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: this.slideIndex === 1 ? "slide activeSlide" : "slide",
        id: `slide-${this.slideIndex}`,
      }
    });

    let contentWrapperHeight = this.container.offsetHeight - COMMENT_CONTAINER_HEIGHT - 22; // 10+10 top and down margin

    let bgImg = this.exportedData && this.exportedData.theme ? this.exportedData.theme : this.theme;

    this.slideBody = createElementAndAppend({
      parentElem: slide,
      attr: {
        class: "slide-body",
        dataSlideIndex: this.slideIndex,
      },
      style: {
        height: contentWrapperHeight + "px",
        background: `url(${bgImg}) no-repeat`,
        backgroundSize: "100% 100%",
      }
    });


    if (this.exportedData) {

      if (this.exportedData.elemTitle) {
        this.createElement({
          slideData: this.slideData,
          parentElem: this.slideBody,
          ...this.exportedData.elemTitle
        })
      }

      if (this.exportedData.elemUserNote) {
        this.createElement({
          slideData: this.slideData,
          parentElem: slide,
          ...this.exportedData.elemUserNote
        })
      }

      this.slideContentWrapper = createElementAndAppend({
        parentElem: this.slideBody,
        attr: {
          class: "main-content"
        },
        style: {
          height: contentWrapperHeight - COMMENT_CONTAINER_HEIGHT + "px"
        }
      });

      let elemCount = 1;
      while (this.exportedData[`elem${elemCount}`] && this.exportedData[`elem${elemCount}`].elemId) {
        this.createElement({
          parentElem: this.slideContentWrapper,
          slideData: this.slideData,
          ...this.exportedData[`elem${elemCount}`]
        });

        elemCount++;
      }

    } else {
      this.slideData[this.slideIndex - 1][`theme`] = this.theme;
      this.slideData[this.slideIndex - 1][`themeColor`] = this.themeColor;

      this.slideData[this.slideIndex - 1][`elemUserNote`] = {};
      // UserNote
      new Element({
        elemType: "div",
        slideIndex: this.slideIndex,
        slideData: this.slideData,
        parentElem: slide,
        createNewElement: true,
        innerHTML: "",
        elemId: "UserNote",
        attr: {
          class: 'user-note',
          title: 'Note of the Slide',
          id: `slide${this.slideIndex}ElementUserNote`,
          contenteditable: true,
        },
        style: {
          height: COMMENT_CONTAINER_HEIGHT - GAP_BETWEEN_ELEMENT + "px",
          marginTop: "20px"
        },
      }).init();


      this.slideData[this.slideIndex - 1][`elemUserNote`]["style"] = {
        height: COMMENT_CONTAINER_HEIGHT + "px"
      };
      // Slide title

      this.slideData[this.slideIndex - 1][`elemTitle`] = {};

      new Element({
        parentElem: this.slideBody,
        slideIndex: this.slideIndex,
        createNewElement: true,
        elemId: "Title",
        attr: {
          class: 'title',
          title: 'Title of the Slide',
          contenteditable: true,
          id: `slide${this.slideIndex}ElementTitle`,
          placeholder: `Enter Title of slide ${this.slideIndex} here...`
        },
        style: {
          fontSize: "48px",
          height: TITLE_CONTAINER_MIN_HEIGHT + "px",
          minHeight: TITLE_CONTAINER_MIN_HEIGHT + "px",
          maxHeight: TITLE_CONTAINER_MIN_HEIGHT * 3 + "px",
          padding: "10px"
        },
        slideData: this.slideData,
      }).init();

      this.slideData[this.slideIndex - 1][`elemTitle`]["style"] = {
        fontSize: "48px",
        height: TITLE_CONTAINER_MIN_HEIGHT + "px",
        minHeight: TITLE_CONTAINER_MIN_HEIGHT + "px",
        padding: "10px"
      };

      // Creating main contant
      this.slideContentWrapper = createElementAndAppend({
        parentElem: this.slideBody,
        attr: {
          class: "main-content"
        },
        style: {
          height: contentWrapperHeight - COMMENT_CONTAINER_HEIGHT - GAP_BETWEEN_ELEMENT / 2 + "px"
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
          color: this.themeColor,
          fontSize: document.querySelector("#fontSize").value
        }
      });
    }
    return this;
  }

  createElement(commonParameters) {

    if (!this.exportedData) {

      this.slideData[this.slideIndex - 1][`elem${this.elementCount}`] = {};

      this.slideData[this.slideIndex - 1][`elem${this.elementCount}`]["style"] = commonParameters.style;

    }
    new Element(commonParameters).init();

    this.elementCount++;

  }
}
