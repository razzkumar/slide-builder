/**
 * Class which create the slides 
 * @example 
 * new SlideBuilder(container).init();
 */

class SlideBuilder {

  /**
   * 
   * @param {*} container Id of the container whare app is created 
   * @param {*} loadingState loding 
   * @param {*} notifier shows notification
   */
  constructor(container, loadingState, notifier) {
    this.container = container;
    this.loadingState = loadingState;
    this.notifier = notifier;
    this.slides = [];
    this.slideIndex = 1;
    this.slideData = [];
    this.presentationData = [];
    this.theme = "img/theme/theme-white-blue-bg.jpg";
    this.themeColor = "#000";
  }

  /**
   * Initilize the Slide builder
   */

  init() {

    this.username = this.username ? this.username : window.localStorage.getItem("username");

    this.header = new Header(this.container, BRAND_NAME).init();
    this.imgModal = new Modal(this.container, "Image", this.loadingState).init();
    this.themeModal = new Modal(this.container, "Theme").init();
    this.listOfPresentationModal = new Modal(this.container, "Presentation").init();

    this.presentatioMode = new PresentationMode(this.container);

    this.slideMainContainer = createElementAndAppend({
      parentElem: this.container,
      attr: {
        class: "container clearfix",
      }
    });

    this.slideList = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-list",
      }
    });

    this.slideWrapper = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-wrapper",
      }
    });

    this.styleContainers();

    window.addEventListener("resize", this.styleContainers.bind(this));

    // Create new slide floating button
    // take a buttom right position of list container and substract 35 to fix position here

    let listContainerBottom = this.slideList.getBoundingClientRect().bottom;
    let listContainerRight = this.slideList.getBoundingClientRect().right;

    let createSlide = createElementAndAppend({
      parentElem: this.slideMainContainer,
      elemType: "i",
      attr: {
        class: "fa fa-plus add"
      },
      style: {
        left: (listContainerRight - 35) + "px",
        top: (listContainerBottom - 35) + "px"
      }
    });

    // Add event listener to create new slide
    createSlide.addEventListener("click", (e) => {
      this.makeNewSlide();
    });

    // Create new slide on click 
    this.header.createNewSlideBtn.addEventListener("click", (e) => {
      this.makeNewSlide();
      this.header.handleDropdownMenu("hide");
    });

    //Create new element on click
    this.header.insertElement.addEventListener("click", (e) => {
      this.makeNewElement();
      this.header.handleDropdownMenu("hide");
    })

    //Insert new image
    this.header.insertImage.addEventListener("click", (e) => {
      this.header.handleDropdownMenu("hide");
      this.imgModal.modalWrapper.style.display = "block";
    });

    // Creating element
    this.imgModal.modalWrapper.addEventListener("click", event => {
      let elem = event.target;

      if (elem.tagName === "IMG") {
        let src = elem.getAttribute("src");
        let alt = elem.getAttribute("alt");
        this.makeNewElement("img", src, alt);
        this.imgModal.modalWrapper.style.display = "none";
      }
    });


    // INSERT THEAME
    this.header.theme.addEventListener("click", e => {
      this.themeModal.modalWrapper.style.display = "block";
      this.header.handleDropdownMenu("hide");
    });

    this.themeModal.modalWrapper.addEventListener("click", event => {

      let elem = event.target;
      if (elem.tagName === "IMG") {
        let src = elem.getAttribute("src");
        this.theme = src;
        if (src.search("white") > 0) {
          this.themeColor = "#000";
        } else {
          this.themeColor = "#fff";
        }

        let alt = elem.getAttribute("alt");
        let slideBodies = document.querySelectorAll(".slide-body");
        slideBodies && slideBodies.length && slideBodies.forEach(elem => {
          elem.setAttribute("alt", `${alt} theme`)
          elem.style.background = `url(${src}) no-repeat`;
          elem.style.backgroundSize = "100% 100%";
        });

        // applying them to all existing slides
        let elements = document.querySelectorAll('[contenteditable = "true"]');
        elements && elements.forEach(elm => {
          elm.style.color = this.themeColor;
        })
        this.themeModal.modalWrapper.style.display = "none";
      } else {
        this.themeModal.modalWrapper.style.display = "none";
      }
    });

    // Open saved presetations
    this.header.openPresentations.addEventListener("click", e => {
      this.listOfPresentationModal.modalWrapper.style.display = "block";
      this.listOfPresentationModal.listProject();
      this.header.handleDropdownMenu("hide");
    });


    // Opening saved file from firebase
    this.listOfPresentationModal.modalWrapper.addEventListener("click", event => {
      let elemTitle = event.target.dataset.title;
      let data = window.localStorage.getItem("presentations");
      data = JSON.parse(data)


      let selectedData = data && data.filter(d => d.name === elemTitle);

      if (selectedData && selectedData.length) {
        this.slideImpoter(selectedData[0].slides)
        this.listOfPresentationModal.modalWrapper.style.display = "none";
      } else {
        this.listOfPresentationModal.modalWrapper.style.display = "none"
      }
    });



    // Exporting data
    this.header.exportSlides.addEventListener("click", () => {

      this.header.handleDropdownMenu("hide");
      let fileName = prompt("If You want to export data \n Please enter FileName name", "Slide-data");
      if (fileName != null) {
        // utils
        exportToJsonFile(this.slideData, fileName);
        this.notifier.init("Slide exported on json file successfully");
      }
    });

    // Save to firebase

    this.header.saveBtn.addEventListener("click", (e) => {
      this.loadingState.show();

      let fileName = prompt("If You want to export data \n Please enter FileName name");
      if (fileName && fileName.length > 3) {
        let data = {
          slides: this.slideData,
          createdOn: new Date() + "",
          name: fileName
        };

        db.collection(`/${this.username}`).add(data)
          .then(docRef => {

            this.loadingState.hide();
            // updating local data
            let storedData = window.localStorage.getItem("presentations");

            if (storedData) {

              storedData = JSON.parse(storedData);
              storedData = [...storedData, data];
              window.localStorage.setItem("presentations", JSON.stringify(storedData));
            }

            this.notifier.init("Slide saved successfully");

          })
          .catch(error => {
            this.notifier.init("Error while saveing data", 3000, "error");
            console.error("Error adding document: ", error);
          });
      } else {
        this.loadingState.hide();
      }

    })

    // handle presentation mode
    this.header.playBtn.addEventListener("click", () => {
      this.presentatioMode.init(this.slides);
    });

    // Importing slides
    this.header.importSlides.addEventListener("change", (e) => {
      this.loadingState.show();
      let file = e.target.files[0];
      let reader = new FileReader();
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = evt => {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          this.loadingState.hide();
          this.reset();
          let data = JSON.parse(evt.target.result);

          // create slide from imported data
          this.slideImpoter(data);
        }
      };
      reader.readAsBinaryString(file.slice(0, file.size)); //file slice will change to blob
    });

    this.makeNewSlide();

    // Storing all data from firebase

    let storedData = window.localStorage.getItem("presentations");

    if (!storedData) {

      let docRef = db.collection(`/${this.username}`);
      docRef.get().then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        if (data && data.length) {
          window.localStorage.setItem("presentations", JSON.stringify(data));
        }

      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

    this.header.logoutBtn.addEventListener("click", (e) => {
      firebase.auth().signOut()
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("presentations");
      window.localStorage.removeItem("images");
      window.location.reload();
    });

    return this;
  }


  /**
   * A function that create slide from  exported data
   * 
   * @param  {*} data 
   */

  slideImpoter(data) {

    // mapping imported 
    if (data && data.length) {

      this.reset();
      data.forEach((data, i) => {

        this.slideData[i] = {
          ...data
        };

        this.makeNewSlide(data);
      });
    }
    this.notifier.init("Successfully file loaded");
  }

  /**
   * A function that reset the slide-builder to create new presentation
   */

  reset() {

    this.slides = [];
    this.slideIndex = 1;
    this.slideData = [];
    this.presentationData = [];
    this.theme = "img/theme/theme-white-blue-bg.jpg";
    this.themeColor = "#000";


    this.slideList.parentElement.removeChild(this.slideList);
    this.slideWrapper.parentElement.removeChild(this.slideWrapper);

    this.slideList = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-list",
      }
    });

    this.slideWrapper = createElementAndAppend({
      parentElem: this.slideMainContainer,
      attr: {
        class: "slide-wrapper",
      }
    });

    this.styleContainers();
  }

  distroy(){
    this.container.parentElement.removeChild(this.container);
  }

  /**
   * A function that style containers which is reused while resizing
   */
  styleContainers() {

    let headerHeight = parseInt(this.header.headerContainer.offsetHeight);

    let height = parseInt(screen.availHeight) - headerHeight - GAP_BETWEEN_ELEMENT * 4;

    this.slideMainContainer.style.height = `${height}px`;
    this.slideWrapper.style.height = `${height}px`;

    let slideBodies = document.querySelectorAll(".slide .slide-body");
    slideBodies && slideBodies.length > 0 && slideBodies.forEach(sBody => {
      let sbHeight = height - COMMENT_CONTAINER_HEIGHT - GAP_BETWEEN_ELEMENT;
      sBody.style.height = sbHeight + "px";
      sBody.querySelector(".main-content").style.height = sbHeight - TITLE_CONTAINER_MIN_HEIGHT + "px"
    })

    // restylying create slide floating btn
    let floatBtn = document.querySelector(".add");
    if (floatBtn) {
      let listContainerBottom = this.slideList.getBoundingClientRect().bottom;
      let listContainerRight = this.slideList.getBoundingClientRect().right;
      floatBtn.style.left = (listContainerRight - 35) + "px"; // 35 is magic number which only work here to position btn 
      floatBtn.style.top = (listContainerBottom - 35) + "px";
    }
  }


  /**
   * A funtion to create new slide if "data" is passed exiting slide will be created 
   * otherwise it create the empty slide
   * @param  {Object} [data] Imported data
   */

  makeNewSlide(data) {
    if (!data) {
      this.slideData[this.slideIndex - 1] = {};
    }
    this.newSlide = new Slide({
      container: this.slideWrapper,
      toolbar: this.header,
      slideIndex: this.slideIndex,
      slideData: this.slideData,
      exportedData: data,
      theme: this.theme,
      themeColor: this.themeColor
    }).init();

    this.slideIndex++;
    this.slides.push(this.newSlide);

    // Create list that appear on left side after creating new slide
    this.makeSlideList();
  }


  /**
   * A function which clone the slide body and make a list to show in left side
   */

  makeSlideList() {
    // Cloning thumbnailSlideBody for list
    let thumbnailSlideBody = this.newSlide.slideBody.cloneNode(true);

    let activeSlide = document.querySelector(".activeSlide");

    let thumbnailStyle = {
      width: window.getComputedStyle(activeSlide).width,
      height: window.getComputedStyle(activeSlide).height,
      transformOrigin: "top left",
      left: "50%",
      top: "50%",
      display: "block",
      transform: "scale(0.17) translate(-50%,-50%)"
    }

    styleElement(thumbnailSlideBody, thumbnailStyle);

    let thumbnail = createElementAndAppend({
      parentElem: this.slideList,
      attr: {
        class: 'thumbnail'
      },
      style: {
        position: 'relative'
      }
    });

    // delete botton
    let deleteBtn = createElementAndAppend({
      parentElem: thumbnail,
      elemType: "i",
      attr: {
        class: this.slides.length <= 1 ? "fa fa-remove single delete" : "fa fa-remove delete"
      }
    });

    // Delete event and event handler is on util.js 
    deleteBtn.addEventListener("click", this.deleteSlide)

    // Adding click event to change slide 
    thumbnailSlideBody.addEventListener("click", (e) => {

      let id = e.currentTarget.getAttribute("dataslideindex");
      activeThumb = document.querySelector(".thumbnail.active");
      activeThumb && activeThumb.classList.remove("active");
      thumbnail.classList.add("active");

      activeSlide = document.querySelector(".activeSlide");
      activeSlide && activeSlide.classList.remove("activeSlide");
      document.querySelector(`#slide-${id}`).classList.add("activeSlide");

    });

    let activeThumb = document.querySelector(".thumbnail.active");
    activeThumb && activeThumb.classList.remove("active");
    thumbnail.classList.add("active");

    activeSlide && activeSlide.classList.remove("activeSlide");
    document.querySelector(`#slide-${this.slideIndex-1}`).classList.add("activeSlide");

    removeUnnecessaryAttr(thumbnailSlideBody);
    // appending on list
    thumbnail.appendChild(thumbnailSlideBody);
  }


  /**
   * A function which handle the creatation of new element on the active slide on click 
   * @param  {String} [elemType] Type of element  
   */
  makeNewElement(elemType, src, alt) {

    let activeSlide = document.querySelector(".activeSlide");

    let slideIndex = parseInt(activeSlide.querySelector(".slide-body").getAttribute("dataslideindex"));
    let mainContent = activeSlide.querySelector(".main-content");
    let elemId = mainContent.children.length + 1;

    this.slideData[slideIndex - 1][`elem${elemId}`] = {};

    let params = {
      slideIndex,
      elemType,
      slideData: this.slideData,
      parentElem: mainContent,
      elemId,
      createNewElement: true,
      src,
      alt,
      style: elemType === "img" ? {
        position: "absolute",
        height: "300px",
        width: "50%",
      } : {
        position: "absolute",
        height: DEFAULT_ELEMENT_HEIGHT + "px",
        width: "95%",
        color: this.themeColor,
        fontSize: document.querySelector("#fontSize").value
      }
    }
    let newElem = new Element(params).init();
    let cloneElem = newElem.cloneNode(true);
    let activeThumb = document.querySelector(".thumbnail.active .main-content");

    activeThumb.appendChild(cloneElem);
  }

  /**
   * A callback function that handle the delete slide
   * @param  {Event} e  Destructuring and geting currentTarget from event
   */
  deleteSlide = (e) => {

    let thumbnail = e.currentTarget.parentElement;

    if (this.slides.length === 1) {
      this.notifier.init("Sorry you can't delete last slide", 3000, "error");
      thumbnail.classList.add("single");
      return;
    };

    let single = document.querySelector(".single");
    single && single.classList.remove("single");

    let nextSibling = thumbnail.nextSibling;
    let previousSibling = thumbnail.previousSibling;
    let activeSlide = document.querySelector(".slide.activeSlide");
    let activeSlideIndex = activeSlide.querySelector(".slide-body").getAttribute("dataslideindex");

    this.notifier.init(`slide successfully deleted`)

    if (nextSibling) {
      nextSibling.classList.add("active");
      activeSlide.nextSibling.classList.add("activeSlide");
    } else if (previousSibling) {
      previousSibling.classList.add("active");
      activeSlide.previousSibling.classList.add("activeSlide");
    } else {
      // Removing thumbnail container at last
      thumbnail.parentElement.parentElement.removeChild(thumbnail.parentElement);
    }

    this.slideData = this.slideData.filter(d => parseInt(d.elemTitle.slideIndex) !== parseInt(activeSlideIndex));

    this.slides = this.slides.filter(slide => slide.slideIndex !== parseInt(activeSlideIndex));

    thumbnail.parentElement.removeChild(thumbnail);
    activeSlide.parentElement.removeChild(activeSlide);

  }
}
