class Header {

  constructor(container) {
    this.container = container;
  }

  setup() {
    // -------------Creating header container--------

    let header = document.createElement("div");
    header.classList.add("header", "clearfix");


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
      class: "dropdown-btn"
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
      class: "dropdown-btn"
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
      id: "fontFamily"
    })

    fontFamily.forEach(font => {
      createElementAndAppend(selectFont, "option", {
        value: font
      }, font);
    })

    let liOfFontSize = createElementAndAppend(ul, "li", {
      class: "font-size-input"
    });

    let fontSize = createElementAndAppend(liOfFontSize, "input", {
      type: "number",
      value: "16"
    });
    fontSize.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("#active");
      if (lastFcused) {
        lastFcused.style.fontSize = e.target.value + "px";
        lastFcused && lastFcused.focus();
      };
    });

    // ---------------------------Text align section----------------------

    let liOfTextAllign = createElementAndAppend(ul, "li", {
      class: "text-align"
    });


    let alignLeft = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Left",
      class: "fa fa-align-left",
      dataCmd: "left",
      cssProperty: "textAlign"
    });

    alignLeft.addEventListener("click", this.formatElement)

    let alignCenter = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Center",
      class: "fa fa-align-center",
      dataCmd: "center",
      cssProperty: "textAlign"
    });

    alignCenter.addEventListener("click", this.formatElement);

    let alignRight = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Right",
      class: "fa fa-align-right",
      dataCmd: "right",
      cssProperty: "textAlign"
    });

    alignRight.addEventListener("click", this.formatElement)

    let alignJustify = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Justify",
      class: "fa fa-align-justify",
      dataCmd: "justify",
      cssProperty: "textAlign"
    });

    alignJustify.addEventListener("click", this.formatElement);


    //
    let liOfTextFormat = createElementAndAppend(ul, "li", {
      class: "text-format",
    });

    let bold = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-bold",
      dataCmd: "bold",
      cssProperty: "fontWeight"
    });

    bold.addEventListener("click", this.formatElement)

    let italic = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-italic",
      dataCmd: "italic",
      cssProperty: "fontStyle"
    });

    italic.addEventListener("click", this.formatElement)

    let underline = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-underline",
      dataCmd: "underline",
      cssProperty: "textDecoration"
    });

    underline.addEventListener("click", this.formatElement);


    let color = createElementAndAppend(liOfTextFormat, "input", {
      type: "color",
      name: "font-color",
      value: "#000"
    });

    color.addEventListener("change", (e) => {
      let lastFcused = document.querySelector("#active");
      if (lastFcused) {
        lastFcused.style.color = e.target.value;
        lastFcused && lastFcused.focus();
      }
    });
    // TODO
    let task1 = createElementAndAppend(ul, "li", null, "<a href='#'>Task 5</a>");
    let task2 = createElementAndAppend(ul, "li", null, "<a href='#'>Task 6</a>");

    return header;
  }

  formatElement(e) {

    let cmd = e.target.getAttribute("dataCmd");
    let cssProperty = e.target.getAttribute("cssProperty");
    let lastFcused = document.querySelector("#active");

    if (lastFcused) {

      if (cssProperty === "fontWeight") {

        lastFcused.style[cssProperty] = lastFcused.style.fontWeight === cmd ? "normal" : cmd;

      } else if (cssProperty === "fontStyle") {

        lastFcused.style[cssProperty] = lastFcused.style.fontStyle === cmd ? "normal" : cmd;

      } else if (cssProperty === "textDecoration") {

        lastFcused.style[cssProperty] = lastFcused.style.textDecoration === cmd ? "none" : cmd;

      } else {

        lastFcused.style[cssProperty] = cmd;

      }

      lastFcused && lastFcused.focus();
    }
  }

  handleClick(e) {
    e.target.nextSibling.classList.toggle("show");
  }
}
