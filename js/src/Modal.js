/**
 * Class that create pop up modal to show the list of (image,theme, slides)
 */

class Modal {

  /**
   * @param {*} parentElem HTML Elemet where Modal is appened
   * @param {String} type type of modal (eg. theme or image)
   */

  constructor(parentElem, type) {
    this.parentElem = parentElem;
    this.type = type;
  }
  /**
   *A function that inilization the Modal
   */
  init() {

    //Creating modal wrapper

    this.modalWrapper = createElementAndAppend({
      parentElem: this.parentElem,
      attr: {
        class: "modal",
        id: `modal-${this.type.toLocaleLowerCase()}`
      },
      style: {
        display: "none"
      }
    });

    // modal close btn

    let closeBtn = createElementAndAppend({
      parentElem: this.modalWrapper,
      attr: {
        class: "close",
        title: "Close Modal"
      },
      innerText: "×"
    });

    closeBtn.addEventListener("click", () => {
      this.modalWrapper.style.display = "none";
    });

    let contentWrapper = createElementAndAppend({
      parentElem: this.modalWrapper,
      attr: {
        class: "modal-content"
      }
    });

    createElementAndAppend({
      parentElem: contentWrapper,
      elemType: "h2",
      innerText: `Please choose the ${this.type}`
    });

    let modalBodyContainer = createElementAndAppend({
      parentElem: contentWrapper,
      attr: {
        class: "modal-body-container"
      }
    });

    this.modalBody = createElementAndAppend({
      parentElem: modalBodyContainer,
      attr: {
        class: "modal-body clearfix"
      }
    });

    // adding static image
    if (this.type === "Image") {
      this.addImage("img/jungle.jpg", "image 1");
      this.addImage("img/dandd.png", "image 2");
      this.addImage("img/mountain.jpg", "image4");
      this.addImage("img/websitebuilder.png", "image 3");
      this.addImage("img/dandd.png", "image 2");
    };

    // adding THEME
    if (this.type === "Theme") {
      this.addImage("img/theme/theme-blue-bg.jpg", "blue");
      this.addImage("img/theme/theme-green-bg.jpg", "green");
      this.addImage("img/theme/theme-material-dark-bg.jpg", "material-dark");
      this.addImage("img/theme/theme-red-bg.jpg", "red");
      this.addImage("img/theme/theme-white-bg.jpg", "white");
      this.addImage("img/theme/theme-white-blue-bg.jpg", "white-blue");
    };

    // listing previously saved presentation

    if (this.type === "Presentation") {
      this.listProject();
    };


    //TODO
    //upload btn wrapper
    let uploadWrapper = createElementAndAppend({
      parentElem: modalBodyContainer,
      attr: {
        class: "uploader"
      }
    });


    // label of upload btn 
    //
    createElementAndAppend({
      parentElem: uploadWrapper,
      elemType: "label",
      attr: {
        for: "uploadImg"
      },
      innerHTML: '<i class="fa fa-upload"></i><span>Upload Image</span>'
    });

    this.uploader = createElementAndAppend({
      parentElem: uploadWrapper,
      elemType: "input",
      attr: {
        type: "file",
        name: "uploadImg",
        id: "uploadImg"
      }
    });

    this.uploader.addEventListener("change", (e) => {
      console.log("change")
    })

    return this;
  }

  /**
   * A funtion that list the previously stored slides/presentation
   */

  listProject() {

    let oldWrapper = document.querySelector(".presentation-wrapper");

    if (oldWrapper) oldWrapper.parentElement.removeChild(oldWrapper);

    let presentationListWrapper = createElementAndAppend({
      parentElem: this.modalBody,
      attr: {
        class: "presentation-wrapper  clearfix"
      }
    })

    let presentations = window.localStorage.getItem("presentations");
    if (presentations) {
      let data = JSON.parse(presentations);

      data && data.forEach(d => {

        createElementAndAppend({
          parentElem: presentationListWrapper,
          attr: {
            class: 'img-wrapper',
            ["data-title"]: d.name
          },
          innerHTML: `<h3 data-title="${d.name}">title: ${d.name}</h3>
                      <date data-title="${d.name}">Created On:${d.createdOn}</date>
                      <button class="btn btn-delete">Delete</button>
                      `
        });
      });

    }
  }

  /**
   * A function that append the image on modal
   * @param {String} src the source of the image 
   * @param {Sting} title description of the image 
   */

  addImage(src, title) {
    createElementAndAppend({
      parentElem: this.modalBody,
      attr: {
        class: 'img-wrapper'
      },
      innerHTML: `<img src=${src} alt="${title}" />`
    })
  }
}
