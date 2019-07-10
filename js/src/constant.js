const BRAND_NAME = "Slide Builder";
const GAP_BETWEEN_ELEMENT = 20;
const COMMENT_CONTAINER_HEIGHT = 70;
const DEFAULT_ELEMENT_HEIGHT = 70
const TITLE_CONTAINER_MIN_HEIGHT = 80;

const FONT_FAMILY_LIST = [{
    fontFamily: "sans-serif",
    value: 'sans-serif'
  },
  {
    fontFamily: "'Montserrat', sans-serif",
    value: 'Montserrat',
  },
  {
    fontFamily: "'Roboto Mono', monospace",
    value: 'Roboto Mono',
  },
  {
    fontFamily: "'Monoton', cursive",
    value: 'Monoton',
  },
  {
    fontFamily: "'Neucha', cursive",
    value: "Neucha",
  },
  {
    fontFamily: "'Roboto', sans-serif",
    value: 'Roboto',
  },
  {
    fontFamily: "'Open Sans', sans-serif",
    value: 'Open Sans',
  },
  {
    fontFamily: "'Roboto Slab', serif",
    value: 'Roboto Slab',
  },
  {
    fontFamily: "'Shadows Into Light', cursive",
    value: 'Shadows Into Light',
  }
];


// toolbar element property 
const toolbarActionsProperty = [{
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      ['data-tooltip']: "Text Align Left",
      class: "fa fa-align-left",
      dataCmd: "left",
      cssProperty: "textAlign",
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      ['data-tooltip']: "Text Align Center",
      class: "fa fa-align-center",
      dataCmd: "center",
      cssProperty: "textAlign"
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      ['data-tooltip']: "Text Align Right",
      class: "fa fa-align-right",
      dataCmd: "right",
      cssProperty: "textAlign"
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      ['data-tooltip']: "Text Align Justify",
      class: "fa fa-align-justify",
      dataCmd: "justify",
      cssProperty: "textAlign"
    }
  },

  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      ["data-tooltip"]: "Bold",
      class: "fa fa-bold",
      dataCmd: "bold",
      cssProperty: "fontWeight"
    }
  },
  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      ["data-tooltip"]: "italic",
      class: "fa fa-italic",
      dataCmd: "italic",
      cssProperty: "fontStyle"
    }
  },
  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      ["data-tooltip"]: "underline",
      class: "fa fa-underline",
      dataCmd: "underline",
      cssProperty: "textDecoration"
    }
  }
]
