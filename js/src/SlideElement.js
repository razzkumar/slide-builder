class SlideElement {

  constructor(parentElem, elemtype, slideIndex, elementCount, attr, style, slideData) {

    this.parentElem = parentElem;
    this.slideIndex = slideIndex;
    this.elementCount = elementCount;
    this.slideData = slideData;

    if (elementCount === "Title") {
      this.element = createElementAndAppend(parentElem, elemtype, attr, null, style);
    } else if (elementCount === "UserNote") {

      this.element = createElementAndAppend(parentElem, elemtype, attr, "NOTE :", style);

    } else {

      let upperElement = document.querySelector(`#slide${slideIndex}Element${elementCount-1}Container`);

      let top = upperElement ? upperElement.offsetTop + upperElement.offsetHeight + GAP_BETWEEN_ELEMENT / 2 : GAP_BETWEEN_ELEMENT / 2;

      this.resizableContainer = createElementAndAppend(this.parentElem, "div", {
        id: `slide${slideIndex}Element${elementCount}Container`,
      }, null, {
        position: "absolute",
        top: `${top}px`,
        minHeight: "30px",
        height: elementCount === 2 ? "300px" : "unset",
        width: elementCount === 2 ? "600px" : "200px",
        minWidth: "200px",
        maxWidth: this.parentElem.clientWidth - GAP_BETWEEN_ELEMENT + "px",
        fontSize: document.querySelector("#fontSize").value
      });


      this.element = createElementAndAppend(this.resizableContainer, elemtype, {
        contenteditable: true,
        id: `slide${slideIndex}Element${elementCount}`,
        placeholder: "Please start writing..."
      }, null)
    }
  }

  setup() {

    if (this.resizableContainer) {

      createElementAndAppend(this.resizableContainer, "div", {
        class: "resizer"
      });

      createElementAndAppend(this.resizableContainer, "div", {
        class: "dragger"
      });

      // Drag and drop only to the content not title and comment section

      dragAndDropElement(this.resizableContainer, this.parentElem);

      // make resizeable
      makeResizableDiv(this.resizableContainer);
    }

    this.slideData[`slide${this.slideIndex}`][`elem${this.elementCount}`]["style"] = formatStyleToStore(this.element.style);

    this.element.addEventListener("focus", (e) => {
      let activeElem = document.querySelector("[dataToolbarActive='true']");
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
        document.querySelector("#fontFamily").value = "sans-serif";
      }
      e.target.setAttribute("dataToolbarActive", "true");
    });


    this.element.addEventListener("input", (e) => {
      let elemOnList = document.querySelector(`.slide-list #slide${this.slideIndex}Element${this.elementCount}`);
      elemOnList.innerHTML = this.element.innerHTML;
      this.slideData[`slide${this.slideIndex}`][`elem${this.elementCount}`]["content"] = this.element.innerText;
    }, true);

    return this.element;
  }
}
