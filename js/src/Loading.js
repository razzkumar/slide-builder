class Loading {
  constructor(container) {
    this.container = container
    this.loadingWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "loading"
      },
      innerHTML: `<img src="img/loading.gif" alt="loading"/>`
    });
  }
  show() {
    this.loadingWrapper.style.display = "block";
  }
  hide() {
    this.loadingWrapper.style.display = "none";
  }
}
