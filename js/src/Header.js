class Header {

  constructor(container) {
    this.container = container;
  }

  setup() {

    // -------------Creating header container--------
    let header = document.createElement("div");
    header.classList.add("header", "container", "clearfix");


    // Appending Header on root
    this.container.appendChild(header);

    let brandContaner = createElementAndAppend({
      parentElem: header,
      elemType: "div",
      attr: {
        class: "brand"
      },
      innerHTML: `<h1><a href='/'>${BRAND_NAME}</a></h1>`
    });
    // ul of toolbar

    let ul = createElementAndAppend({
      parentElem: header,
      elemType: "ul"
    });

    let liOfFileHandler = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "dropdown-container"
      }
    });

    // Adding dropdown button for file handling (i.e import,export);
    let fileHandle = createElementAndAppend({
      parentElem: liOfFileHandler,
      elemType: "button",
      attr: {
        class: "btn dropdown-btn"
      },
      innerText: "File"
    });

    fileHandle.addEventListener("click", this.handleClick);

    let fileDropDownlist = createElementAndAppend({
      parentElem: liOfFileHandler,
      elemType: "div",
      attr: {
        class: "dropdown-list"
      }
    });

    let newSlide = createElementAndAppend({
      parentElem: fileDropDownlist,
      elemType: "span",
      innerText: "New Slide"
    });
    let importSlides = createElementAndAppend({
      parentElem: fileDropDownlist,
      elemType: "div",
      innerHTML: '<i class="fa fa-file-import"></i> <span>Import</span>'
    });
    let exportSlides = createElementAndAppend({
      parentElem: fileDropDownlist,
      elemType: "div",
      attr: null,
      innerHTML: '<i class="fa fa-file-export"></i> <span>Export</span>'
    });


    // adding dropdown btn for insert handling
    let liOfExportHandler = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "dropdown-container"
      }
    });

    let InsertHandle = createElementAndAppend({
      parentElem: liOfExportHandler,
      elemType: "button",
      attr: {
        class: "btn dropdown-btn"
      },
      innerText: "Insert"
    });

    InsertHandle.addEventListener("click", this.handleClick);
    let insertDropDownlist = createElementAndAppend({
      parentElem: liOfExportHandler,
      elemType: "div",
      attr: {
        class: "dropdown-list"
      }
    });

    let insertImage = createElementAndAppend({
      parentElem: insertDropDownlist,
      elemType: "div",
      innerHTML: '<i class="fa fa-image"></i> <span>Image</span>'
    });
    let insertVideo = createElementAndAppend({
      parentElem: insertDropDownlist,
      elemType: "div",
      innerHTML: '<i class="fa fa-video"></i> <span>Video</span>'
    });

    // adding fontFamily selection

    let liOfFontFamilySelect = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "font-family-select"
      }
    });

    let selectFont = createElementAndAppend({
      parentElem: liOfFontFamilySelect,
      elemType: "select",
      attr: {
        name: "fontFamily",
        id: "fontFamily",
        value: "sans-serif"
      }
    })

    // list of fontFamily is decleared on constant.js
    FONT_FAMILY_LIST.forEach(font => {
      createElementAndAppend({
        parentElem: selectFont,
        elemType: "option",
        attr: {
          value: font.fontFamily,
        },
        innerText: font.value
      });
    });

    selectFont.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.fontFamily = e.target.value;
      };
    });


    let liOfFontSize = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "font-size-input"
      }
    });

    let fontSize = createElementAndAppend({
      parentElem: liOfFontSize,
      elemType: "input",
      attr: {
        type: "number",
        value: "16",
        id: "fontSize"
      }
    });

    fontSize.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.fontSize = e.target.value + "px";
      };
    });


    // -------------------Text align element container-----------------------

    this.liOfTextAllign = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "text-align"
      }
    });

    //-----------------Text fromat element  container-------------------------

    this.liOfTextFormat = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      attr: {
        class: "text-format",
      }
    });

    //-----toolbarActionsProperty  is defined on util.js-----------------------
    toolbarActionsProperty.forEach(d => {
      let tool = createElementAndAppend({
        parentElem: this[d.parentElem],
        elemType: d.elem,
        attr: d.attr
      });
      tool.addEventListener("click", this.formatElement)
    });

    let color = createElementAndAppend({
      parentElem: this.liOfTextFormat,
      elemType: "input",
      attr: {
        type: "color",
        name: "font-color",
        value: "#000"
      }
    });

    color.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.color = e.target.value;
        lastFcused && lastFcused.focus();
      }
    });

    let backgroundColor = createElementAndAppend({
      parentElem: ul,
      elemType: "input",
      attr: {
        type: "color",
        name: "font-color",
        value: "#000"
      }
    });

    backgroundColor.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.backgroundColor = e.target.value;
        lastFcused && lastFcused.focus();
      }
    });

    // TODO
    let task1 = createElementAndAppend({
      parentElem: ul,
      elemType: "button",
      attr: {
        class: "btn"
      },
      innerText: "Theme",
    });

    let task2 = createElementAndAppend({
      parentElem: ul,
      elemType: "li",
      innerHTML: "<a href='#'>Task 6</a>"
    });

    // play btn
    let playBtn = createElementAndAppend({
      parentElem: header,
      elemType: "button",
      attr: {
        class: "btn"
      },
      innerHTML: "<i class='fa fa-play'></i>&nbsp; Play",
      style: {
        float: "right",
        padding: "5px 20px",
        width: "100px",
        textAllign: "center"
      }
    });
    playBtn.addEventListener("click", this.openFullscreen);
    return header;
  }

  /* Function to open fullscreen mode */
  openFullscreen(e) {
    let elem = document.querySelector(".slide-wrapper#slide-1");

    let allContentEditAble = elem.querySelectorAll("[contenteditable='true']");
    allContentEditAble.forEach(elem => {
      elem.setAttribute("contenteditable", "false");
    })

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  formatElement(e) {
    let cmd = e.target.getAttribute("dataCmd");
    let cssProperty = e.target.getAttribute("cssProperty");
    let lastFcused = document.querySelector("[dataToolbarActive='true']");
    if (lastFcused) {

      // bold handler
      if (cssProperty === "fontWeight") {
        if (lastFcused.style.fontWeight !== cmd) {
          e.target.classList.add("activeTool");
          lastFcused.style[cssProperty] = cmd;
        } else {
          e.target.classList.remove("activeTool");
          lastFcused.style[cssProperty] = "normal";
        }
        // italic handler
      } else if (cssProperty === "fontStyle") {
        if (lastFcused.style.fontStyle !== cmd) {
          e.target.classList.add("activeTool");
          lastFcused.style.fontStyle = cmd;
        } else {
          e.target.classList.remove("activeTool");
          lastFcused.style[cssProperty] = "normal";
        }
        // underline handle
      } else if (cssProperty === "textDecoration") {
        if (lastFcused.style.textDecoration !== cmd) {
          e.target.classList.add("activeTool");
          lastFcused.style[cssProperty] = cmd;
        } else {
          e.target.classList.remove("activeTool");
          lastFcused.style[cssProperty] = "none";
        }
        // text-align (center,left,right,justify) handler
      } else {
        let oldActiveAlign = document.querySelector(".text-align>.activeTool");
        if (lastFcused.style[cssProperty] !== cmd) {
          oldActiveAlign && oldActiveAlign.classList.remove("activeTool");
          e.target.classList.add("activeTool");
          lastFcused.style[cssProperty] = cmd;
        } else {
          if (lastFcused.style[cssProperty] !== cmd) {
            e.target.classList.remove("activeTool");
          };
        }
      }
      lastFcused && lastFcused.focus();
    }
  }

  handleClick(e) {
    e.target.nextSibling.classList.toggle("show");
  }
}
