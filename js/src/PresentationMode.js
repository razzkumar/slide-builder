/**
 * Class that enable the presentation mode on the slide
 */

class PresentationMode {
  /**
   *@param {*} container 
   */

  constructor(container) {
    this.container = container;
    this.isFullScreen = false;
    this.presentationData = [];
  }

  /**
   * A function that initilize the presentation mode
   *
   * @param {Object} slides list of slide on the presentation
   */

  init(slides) {

    // collecting presentable data/div

    slides.forEach(slide => {
      let presentationBody = slide.slideBody.cloneNode(true);
      let mainContent = presentationBody.querySelector(".main-content");
      mainContent.style.height = screen.height - TITLE_CONTAINER_MIN_HEIGHT - GAP_BETWEEN_ELEMENT - 80 + "px"; // 40+ 40 top down padding

      removeUnnecessaryAttr(presentationBody);

      this.presentationData.push(presentationBody);
    });

    this.isFullScreen = true;
    let presentationBodyWrapper = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "fullscreen"
      },
      style: {
        width: "100vw",
        height: "100vh",
        position: "relative"
      }
    })

    let presentationSlides = createElementAndAppend({
      parentElem: presentationBodyWrapper,
      attr: {
        class: "presentation-slide"
      },
      style: {
        height: "100vh",
        position: "absolute",
        width: this.presentationData.length * 100 + "vw"
      }
    });

    this.presentationData.forEach(slideBody => {
      slideBody.style.float = "left";
      slideBody.style.width = "100vw";
      slideBody.style.height = '100vh'
      presentationSlides.appendChild(slideBody);
    });

    // Make Fullscreen
    if (presentationBodyWrapper.requestFullscreen) {
      presentationBodyWrapper.requestFullscreen();
    } else if (presentationBodyWrapper.webkitRequestFullscreen) {
      console.log("Chrome Fullscreen");
      presentationBodyWrapper.webkitRequestFullscreen();
    } else if (presentationBodyWrapper.mozRequestFullScreen) {
      console.log("Firefox Fullscreen");
      presentationBodyWrapper.mozRequestFullScreen();
    } else if (presentationBodyWrapper.msRequestFullscreen) {
      console.log("MS Fullscreen");
      presentationBodyWrapper.msRequestFullscreen();
    }


    document.addEventListener('fullscreenchange', () => {
      let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (!fullscreenElement) {
        this.presentationData = [];
        presentationBodyWrapper && presentationBodyWrapper.parentElement && presentationBodyWrapper.parentElement.removeChild(presentationBodyWrapper);
        this.isFullscreen = false;
      }
    });

  }
}
