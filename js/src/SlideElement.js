class SlideElement {

  constructor(parentElem, elemtype, slideNumber, elementNumber) {

    this.parentElem = parentElem;

    this.element = createElementAndAppend(parentElem, elemtype, {
      contenteditable: true,
      id: `slide-${slideNumber}-element-${elementNumber}`,
      placeholder: "Please start writing..."
    })

  }

  setup() {

    this.element.addEventListener("focus", (e) => {
      let activeElem = document.querySelector("#active");
      activeElem && activeElem.removeAttribute("id");
      e.target.setAttribute("id", "active");
    });

    this.element.addEventListener("input", (e) => {
      console.log("thi", this.element.innerText);
    }, true);

    dragAndDropElement(this.element, this.parentElem);

    return this.element;
  }
}
