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
    dragAndDropElement(this.element, this.parentElem);
  }
}
