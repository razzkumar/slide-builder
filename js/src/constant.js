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

const DATA = [{
  "elemUserNote": {
    "style": {
      "height": "70px"
    }
  },
  "elemTitle": {
    "style": {
      "fontSize": "48px",
      "height": "80px",
      "minHeight": "80px",
      "maxHeight": "240px",
      "paddingTop": "10px",
      "paddingRight": "10px",
      "paddingBottom": "10px",
      "paddingLeft": "10px"
    },
    "innerHTML": "Hola&nbsp;"
  },
  "elem1": {
    "style": {
      "backgroundColor": "rgb(175, 46, 190)",
      "color": "rgb(255, 255, 255)",
      "position": "absolute",
      "top": "82.6172%",
      "minHeight": "30px",
      "height": "15.625%",
      "width": "17.1579%",
      "maxWidth": "100%",
      "left": "82.4769%"
    },
    "elemId": 1,
    "slideIndex": 1,
    "innerHTML": "A quick brown fox jumps over fasfdas"
  },
  "elem2": {
    "elemId": 2,
    "slideIndex": 1,
    "elemType": "img",
    "style": {
      "position": "absolute",
      "height": "300px",
      "width": "50%",
      "left": "3.14864%",
      "top": "8.59375%"
    }
  }
}]
