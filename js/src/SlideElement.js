class SlideElement {

  constructor(params) {

    this.parentElem = params.parentElem;
    this.slideIndex = params.slideIndex;
    this.elemId = params.elemId;
    this.slideData = params.slideData;

    this.slideData[params.slideIndex - 1][`elem${params.elemId}`]["elemId"] = params.elemId;
    this.slideData[params.slideIndex - 1][`elem${params.elemId}`]["slideIndex"] = params.slideIndex;
    if (params.attr) {
      this.slideData[params.slideIndex - 1][`elem${params.elemId}`]["attr"] = params.attr;
    }

    if (params.elemId === "Title") {
      this.element = createElementAndAppend(params);
    } else if (params.elemId === "UserNote") {

      this.element = createElementAndAppend({
        ...params,
        innerText: "NOTE :"
      });

    } else {

      let upperElement = document.querySelector(`#slide${params.slideIndex}Element${params.elemId-1}Container`);

      let top = upperElement ? upperElement.offsetTop + upperElement.offsetHeight + GAP_BETWEEN_ELEMENT / 2 : GAP_BETWEEN_ELEMENT / 2;
      this.resizableContainer = createElementAndAppend({
        parentElem: this.parentElem,
        attr: {
          id: `slide${params.slideIndex}Element${params.elemId}Container`,
        },
        style: {
          ...params.style,
          top: params.createNewElement ? `${top}px` : params.style.top
        }
      });


      this.element = createElementAndAppend({
        parentElem: this.resizableContainer,
        elemType: params.elemType,
        attr: {
          contenteditable: true,
          id: `slide${params.slideIndex}Element${params.elemId}`,
          placeholder: "Please start writing..."
        }
      });
    }
  }

  setup() {

    if (this.resizableContainer) {

      this.resizer = createElementAndAppend({
        parentElem: this.resizableContainer,
        attr: {
          class: "resizer"
        }
      });

      createElementAndAppend({
        parentElem: this.resizableContainer,
        attr: {
          class: "dragger"
        }
      });

      this.rotator = createElementAndAppend({
        parentElem: this.resizableContainer,
        attr: {
          class: "elem-rotator"
        }
      });

      // Drag and drop only to the content not title and comment section

      dragAndDropElement(this.resizableContainer, this.parentElem);

      // make resizeable
      makeResizableDiv(this.resizableContainer);

    }

    this.slideData[this.slideIndex - 1][`elem${this.elemId}`]["style"] = formatStyleToStore(this.element.style);

    // Focus event on event
    this.element.addEventListener("focus", (e) => {

      let activeElem = document.querySelector("[dataToolbarActive='true']");

      let previousActiveResizer = activeElem && activeElem.parentElement.querySelector(".resizer");
      let previousActiveRotator = activeElem && activeElem.parentElement.querySelector(".elem-rotator");

      if (previousActiveResizer || previousActiveRotator) {
        previousActiveRotator.style.display = "none";
        previousActiveResizer.style.display = "none";

      }

      if (this.resizer || this.rotator) {
        this.resizer.style.display = "initial";
        this.rotator.style.display = "initial";
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
        document.querySelector("#fontFamily").value = "sans-serif";
      }
      e.target.setAttribute("dataToolbarActive", "true");

      // updating style of the element on this.slideData
      let parentElemEId = e.target.parentElement.getAttribute("id");
      if (parentElemEId && parentElemEId.includes("Container")) {
        let style = formatStyleToStore(e.target.parentElement.style);
        if (JSON.stringify(style) !== JSON.stringify(this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style)) {
          this.slideData[this.slideIndex - 1][`elem${this.elemId}`].style = style;
        }
      }
    });


    this.element.addEventListener("input", (e) => {
      let elemOnList = document.querySelector(`.slide-list #slide${this.slideIndex}Element${this.elemId}`);
      if (elemOnList) {
        elemOnList.innerHTML = this.element.innerHTML;
      }
      this.slideData[this.slideIndex - 1][`elem${this.elemId}`]["innerHTML"] = this.element.innerHTML;
    }, true);

    return this.element;
  }
}
