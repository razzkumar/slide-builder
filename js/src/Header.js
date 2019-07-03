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

    // brand container
    let brandContaner = createElementAndAppend(header, "div", {
      class: "brand"
    });

    let brandH1 = createElementAndAppend(brandContaner, "h1");

    let linkBrand = createElementAndAppend(brandH1, "a", {
      href: "/"
    }, BRAND_NAME);

    // ul of toolbar

    let ul = createElementAndAppend(header, "ul");

    let liOfFileHandler = createElementAndAppend(ul, "li", {
      class: "dropdown-container"
    });

    // Adding dropdown button for file handling (i.e import,export);
    let fileHandle = createElementAndAppend(liOfFileHandler, "button", {
      class: "btn dropdown-btn"
    }, "File");

    fileHandle.addEventListener("click", this.handleClick);

    let fileDropDownlist = createElementAndAppend(liOfFileHandler, "div", {
      class: "dropdown-list"
    });

    let newSlide = createElementAndAppend(fileDropDownlist, "span", null, "New Slide");
    let importSlides = createElementAndAppend(fileDropDownlist, "div", null, '<i class="fa fa-file-import"></i> <span>Import</span>');
    let exportSlides = createElementAndAppend(fileDropDownlist, "div", null, '<i class="fa fa-file-export"></i> <span>Export</span>');


    // adding dropdown btn for insert handling
    let liOfExportHandler = createElementAndAppend(ul, "li", {
      class: "dropdown-container"
    });

    let InsertHandle = createElementAndAppend(liOfExportHandler, "button", {
      class: "btn dropdown-btn"
    }, "Insert");

    InsertHandle.addEventListener("click", this.handleClick);
    let insertDropDownlist = createElementAndAppend(liOfExportHandler, "div", {
      class: "dropdown-list"
    });

    let insertImage = createElementAndAppend(insertDropDownlist, "div", null, '<i class="fa fa-image"></i> <span>Image</span>');
    let insertVideo = createElementAndAppend(insertDropDownlist, "div", null, '<i class="fa fa-video"></i> <span>Video</span>');

    // adding fontFamily selection

    let liOfFontFamilySelect = createElementAndAppend(ul, "li", {
      class: "font-family-select"
    });

    let selectFont = createElementAndAppend(liOfFontFamilySelect, "select", {
      name: "fontFamily",
      id: "fontFamily",
      value: "sans-serif"
    })

    // list of fontFamily is decleared on constant.js

    FONT_FAMILY_LIST.forEach(font => {
      createElementAndAppend(selectFont, "option", {
        value: font.fontFamily,
      }, font.value);
    });

    selectFont.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.fontFamily = e.target.value;
      };
    });


    let liOfFontSize = createElementAndAppend(ul, "li", {
      class: "font-size-input"
    });

    let fontSize = createElementAndAppend(liOfFontSize, "input", {
      type: "number",
      value: "16",
      id: "fontSize"
    });

    fontSize.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.fontSize = e.target.value + "px";
      };
    });


    // -------------------Text align element container----------------------
    this.liOfTextAllign = createElementAndAppend(ul, "li", {
      class: "text-align"
    });

    //-----------------Text fromat element  container----------------------------
    this.liOfTextFormat = createElementAndAppend(ul, "li", {
      class: "text-format",
    });

    //-----toolbarActionsProperty  is defined on util.js------------------ 
    toolbarActionsProperty.forEach(d => {
      let tool = createElementAndAppend(this[d.parentElem], d.elem, d.attr);
      tool.addEventListener("click", this.formatElement)
    });

    let color = createElementAndAppend(this.liOfTextFormat, "input", {
      type: "color",
      name: "font-color",
      value: "#000"
    });

    color.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.color = e.target.value;
        lastFcused && lastFcused.focus();
      }
    });

    let backgroundColor = createElementAndAppend(ul, "input", {
      type: "color",
      name: "font-color",
      value: "#000"
    });

    backgroundColor.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("[dataToolbarActive='true']");
      if (lastFcused) {
        lastFcused.style.backgroundColor = e.target.value;
        lastFcused && lastFcused.focus();
      }
    });
    // TODO
    let task1 = createElementAndAppend(ul, "button", {
      class: "btn"
    }, "Theme", );
    let task2 = createElementAndAppend(ul, "li", null, "<a href='#'>Task 6</a>");

    // play btn
    let playBtn = createElementAndAppend(header, "button", {
      class: "btn"
    }, "<i class='fa fa-play'></i>&nbsp; Play", {
      float: "right",
      padding: "5px 20px",
      width: "100px",
      textAllign: "center"
    });
    playBtn.addEventListener("click", this.openFullscreen);
    return header;
  }

  /* Function to open fullscreen mode */
  openFullscreen(e) {
    let elem = document.querySelector(".slide-wrapper #slide1");

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
