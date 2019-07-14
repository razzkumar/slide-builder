/**
 *Class that create a loading effect on the app while app is loading 
 *
 */

class Loading {

  /**
   *@param {*} container HTML element where it is appened 
   */

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


  /***
   * A function that display the loading effect on the app
   */
  show() {
    this.loadingWrapper.style.display = "block";
  }


  /***
   * A function that hide loading effect from the app
   */
  hide() {
    this.loadingWrapper.style.display = "none";
  }
}
