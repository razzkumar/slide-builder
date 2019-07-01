class Header {
  constructor(container) {
    this.container = container;
    this.header = document.createElement("div");
    this.header.classList.add("header", "clearfix");
  }
  setup() {
    // Appending Header on root
    this.container.appendChild(this.header);

    // brand div
    this.brandContaner = createElementAndAppend(this.header, "div", {
      class: "brand"
    });

    this.h1 = createElementAndAppend(this.brandContaner, "h1");

    this.linkBrand = createElementAndAppend(this.h1, "a", {
      href: "/"
    }, BRAND_NAME);

    // ul of toolbar

    let ul = createElementAndAppend(this.header, "ul");

    let liOfFileHandler = createElementAndAppend(ul, "li", {
      class: "dropdown-container"
    });

    // Adding dropdown button for file handling (i.e import,export);
    this.fileHandle = createElementAndAppend(liOfFileHandler, "button", {
      class: "dropdown-btn"
    }, "File");
    let fileDropDownlist = createElementAndAppend(liOfFileHandler, "div", {
      class: "dropdown-list"
    });

    this.newSlide = createElementAndAppend(fileDropDownlist, "span", null, "New Slide");
    this.importSlides = createElementAndAppend(fileDropDownlist, "div", null, '<i class="fa fa-file-import"></i> <span>Import</span>');
    this.exportSlides = createElementAndAppend(fileDropDownlist, "div", null, '<i class="fa fa-file-export"></i> <span>Export</span>');


    // adding dropdown btn for insert handling
    let liOfExportHandler = createElementAndAppend(ul, "li", {
      class: "dropdown-container"
    });

    this.InsertHandle = createElementAndAppend(liOfExportHandler, "button", {
      class: "dropdown-btn"
    }, "Insert");

    let insertDropDownlist = createElementAndAppend(liOfExportHandler, "div", {
      class: "dropdown-list"
    });

    this.importSlides = createElementAndAppend(insertDropDownlist, "div", null, '<i class="fa fa-image"></i> <span>Image</span>');
    this.exportSlides = createElementAndAppend(insertDropDownlist, "div", null, '<i class="fa fa-video"></i> <span>Video</span>');

    // adding fontFamily selection

    let liOfFontFamilySelect = createElementAndAppend(ul, "li", {
      class: "font-family-select"
    });
    this.selectFont = createElementAndAppend(liOfFontFamilySelect, "select", {
      name: "fontFamily",
      id: "fontFamily"
    })

    fontFamily.forEach(font => {
      createElementAndAppend(this.selectFont, "option", {
        value: font
      }, font);
    })

    let liOfFontSize = createElementAndAppend(ul, "li", {
      class: "font-size-input"
    });

    this.fontSize = createElementAndAppend(liOfFontSize, "input", {
      type: "number",
      value: "16"
    });

    let liOfTextAllign = createElementAndAppend(ul, "li", {
      class: "text-align"
    });


    // Text align section
    this.alignLeft = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Left",
      class: "fa fa-align-left",
    });

    this.alignCenter = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Center",
      class: "fa fa-align-center"
    });
    this.alignRight = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Right",
      class: "fa fa-align-right"
    });
    this.alignCenter.addEventListener("click", () => {
      document.execCommand("JustifyRight")
    })
    this.alignJustify = createElementAndAppend(liOfTextAllign, "i", {
      title: "Text Align Justify",
      class: "fa fa-align-justify"
    });

    // Text format section
    let liOfTextFormat = createElementAndAppend(ul, "li", {
      class: "text-format",
    });

    this.bold = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-bold",
    });

    this.italic = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-italic"
    });

    this.underline = createElementAndAppend(liOfTextFormat, "i", {
      class: "fa fa-underline"
    });

    this.color = createElementAndAppend(liOfTextFormat, "input", {
      type: "color",
      name: "font-color",
      id: "font-color"
    });

    // TODO
    let task1 = createElementAndAppend(ul, "li", null, "<a href='#'>Task 5</a>");
    let task2 = createElementAndAppend(ul, "li", null, "<a href='#'>Task 6</a>");

    return this;
  }
}
