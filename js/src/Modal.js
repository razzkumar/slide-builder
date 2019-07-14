/**
 * Class that create pop up modal to show the list of (image,theme, slides)
 */

class Modal {

  /**
   * @param {*} parentElem HTML Elemet where Modal is appened
   * @param {String} type type of modal (eg. theme or image)
   */

  constructor(parentElem, type, loadingState) {
    this.parentElem = parentElem;
    this.type = type;
    this.loadingState = loadingState
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

      let username = window.localStorage.getItem("username");

      // Getting images
      let storedimages = window.localStorage.getItem("images");
      if (!storedimages) {

        let imgDocRef = db.collection(`/images-${username}`);
        imgDocRef.get().then(querySnapshot => {
          let img = [];
          querySnapshot.forEach(doc => {
            img.push(doc.data());
          });
          if (img && img.length) {
            img.forEach(d => {
              this.addImage(d.url, d.name);
            })
            window.localStorage.setItem("images", JSON.stringify(img));
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      } else {
        let data = JSON.parse(storedimages);
        data && data.forEach(d => {
          this.addImage(d.url, d.name);
        })
      }

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
        let file = e.target.files[0];
        if (file) {

          this.loadingState.show();
          // Create a storage ref
          let storageRef = firebase.storage().ref(`upload/${username}/` + file.name);

          // Upload file
          storageRef.put(file).then(snapshot => {
            let name = snapshot.ref.name;

            snapshot.ref.getDownloadURL().then(downloadURL => {

              let data = {
                url: downloadURL,
                name
              };

              db.collection(`/images-${username}`).add(data)
                .then(docRef => {
                  this.loadingState.hide();
                  let storedimages = window.localStorage.getItem("images");
                  if (storedimages) {
                    storedimages = JSON.parse(storedimages);
                    let newData = [...storedimages, data];
                    window.localStorage.setItem("images", JSON.stringify(newData));
                  } else {
                    window.localStorage.setItem("images", JSON.stringify([data]));
                  }
                  this.addImage(downloadURL, name);
                });
            });
          });

        }
      })

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
    } else {

      createElementAndAppend({
        parentElem: presentationListWrapper,
        attr: {
          class: 'error',
        },
        innerHTML: `<h3>You have saved any slides</h3>
                            `
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
