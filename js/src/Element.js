/**
 * Class Representing Single Element of a slide
 */
class Element {
  /**
   * Create a Element
   * 
   * @param  {String} {[elemType="div"] type of element (eg. div)
   * @param  {number} slideIndex index of the slide 
   * @param  {Object} slideData all the data of the slide
   * @param  {String} parentElem  Parent Element in which new element is appened
   * @param  {String} innerHTML  content of the element
   * @param  {String} innerText  content of the element
   * @param  {String | Number} elemId  Id of the element 
   * @param  {Object} attr all the attributes of the element
   * @param  {Object} style default style of the element that will be applied inline on element
   * @param  {Boolean} [createNewElement]} create new element or import element
   */

  constructor({
    elemType,
    slideIndex,
    slideData,
    parentElem,
    innerHTML,
    innerText,
    elemId,
    attr,
    style,
    alt,
    src,
    createNewElement
  }) {

    this.parentElem = parentElem;
    this.slideIndex = slideIndex;
    this.elemId = elemId;
    this.slideData = slideData;

    // storing data;
    if (createNewElement) {

      this.slideData[slideIndex - 1][`elem${elemId}`]["elemId"] = elemId;
      this.slideData[slideIndex - 1][`elem${elemId}`]["slideIndex"] = slideIndex;

      if (attr) {
        this.slideData[slideIndex - 1][`elem${elemId}`]["attr"] = attr;
      } else if (elemType) {
        this.slideData[slideIndex - 1][`elem${elemId}`]["elemType"] = elemType;
      }

      if (src) {
        this.slideData[slideIndex - 1][`elem${elemId}`]["src"] = src;
        this.slideData[slideIndex - 1][`elem${elemId}`]["alt"] = alt;
      }
    }

    if (elemId === "Title") {
      this.element = createElementAndAppend({
        parentElem,
        innerHTML,
        innerText,
        attr,
        style,
      });
    } else if (elemId === "UserNote") {

      this.element = createElementAndAppend({
        parentElem,
        attr,
        style,
        innerHTML,
        innerText: "NOTE :"
      });

    } else {

      let upperElement = document.querySelector(`#slide${slideIndex}Element${elemId-1}Container`);

      let top = upperElement ? parseInt(upperElement.style.height) * (elemId - 1) + (GAP_BETWEEN_ELEMENT / 2) * (elemId) : GAP_BETWEEN_ELEMENT / 2;

      top = createNewElement ? `${top}px` : style.top
      // placing element in random place after place is occupie
      if ((parseInt(top) + DEFAULT_ELEMENT_HEIGHT) >= parseInt(this.parentElem.style.height)) {
        top = GAP_BETWEEN_ELEMENT * elemId + "px";
      }

      this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style = {
        ...style,
        top
      };
      this.resizableContainer = createElementAndAppend({
        parentElem: this.parentElem,
        attr: {
          id: `slide${slideIndex}Element${elemId}Container`,
        },
        style: {
          ...style,
          top,
        }
      });

      attr = elemType === "img" ? {
        src,
        id: `slide${slideIndex}Element${elemId}`,
        contenteditable: true,
        alt: `${alt} - slide ${slideIndex} Element ${elemId} image `
      } : {
        contenteditable: true,
        id: `slide${slideIndex}Element${elemId}`,
        placeholder: "Please start writing..."
      };

      this.element = createElementAndAppend({
        innerHTML,
        parentElem: this.resizableContainer,
        elemType,
        style: elemType === "img" ? {
          width: "100%",
          height: "100%"
        } : {
          fontSize: "22px",
        },
        attr
      });
    }
  }


  /**
   * A function to initilize the slide Element 
   * @returns Element Object
   */
  init() {

    if (this.resizableContainer) {

      // element resizer

      this.resizer = createElementAndAppend({
        parentElem: this.resizableContainer,
        attr: {
          class: "resizer"
        }
      });

      // drag and drop grabber
      createElementAndAppend({
        parentElem: this.resizableContainer,
        attr: {
          class: "dragger"
        }
      });

      // Drag and drop only to the content not title and comment section

      updatePosition(this.resizableContainer, "drag");

      // make resizeable
      updatePosition(this.resizableContainer, "resize");

    }
    // Focus event on event
    this.element.addEventListener("focus", (e) => {
      if (!this.element.innerHTML) {
        this.element.innerHTML = " "
      }
      let activeElem = document.querySelector("[dataToolbarActive='true']");
      // make resizer visible
      let previousActiveResizer = activeElem && activeElem.parentElement.querySelector(".resizer");

      if (previousActiveResizer) {
        previousActiveResizer.style.display = "none";
      }

      if (this.resizer) {
        this.resizer.style.display = "initial";
      }

      activeElem && activeElem.removeAttribute("dataToolbarActive");

      toolbarActionsProperty.forEach(d => {
        let activeTool = document.querySelector(`[dataCmd=${d.attr.dataCmd}]`);
        if (e.target.style[d.attr.cssProperty] === d.attr.dataCmd) {
          activeTool && activeTool.classList.add("activeTool");
        } else {
          activeTool && activeTool.classList.remove("activeTool");
        }
      });

      let fontSize = e.target.style.fontSize;
      if (fontSize) {
        document.querySelector("#fontSize").value = parseInt(fontSize);
      } else {
        document.querySelector("#fontSize").value = 16;
      }

      let fontFamily = e.target.style.fontFamily;

      if (fontFamily) {
        document.querySelector("#fontFamily").value = fontFamily;
      } else {
        document.querySelector("#fontFamily").value = "sans-serif"; //default
      }

      e.target.setAttribute("dataToolbarActive", "true");
      this.updateStyleData();
    });

    this.element.addEventListener("focusout", () => {
      if (!this.element.innerHTML.trim()) {
        this.element.innerHTML = ""
      }
      this.updateStyleData();
    })

    //Watch the change on slide's element's content and collectd the data
    this.element.addEventListener("input", (e) => {

      let elemOnList = document.querySelector(`.slide-list #slide${this.slideIndex}Element${this.elemId}`);

      if (elemOnList) {
        elemOnList.innerHTML = this.element.innerHTML;
      }

      this.slideData[this.slideIndex - 1][`elem${this.elemId}`]["innerHTML"] = this.element.innerHTML;

    }, true);

    return this.resizableContainer;
  }

  // updating style of the element on this.slideData
  updateStyleData() {
    let currentStyle = formatStyleToStore(this.element.style);
    let prevStyle = this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style;

    let parentElement = this.element.parentElement;
    let parentElemEId = parentElement.getAttribute("id");

    if (parentElemEId && parentElemEId.includes("Container")) {
      let style = formatStyleToStore(parentElement.style);
      if (this.element.tagName !== "IMG") {
        style = {
          ...currentStyle,
          ...style,
        };
      }

      if (JSON.stringify(style) !== JSON.stringify(prevStyle)) {
        this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style = style;
      }
    } else if (JSON.stringify(currentStyle) !== JSON.stringify(prevStyle)) {
      this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style = currentStyle;
    }
  }
}
