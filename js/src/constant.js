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
    "elemId": "UserNote",
    "slideIndex": 1,
    "attr": {
      "class": "user-note",
      "title": "Note of the Slide",
      "id": "slide1ElementUserNote",
      "contenteditable": true
    },
    "style": {
      "height": "70px"
    },
    "innerHTML": "NOTE :fsdafsadfsadfsadf"
  },
  "elemTitle": {
    "elemId": "Title",
    "slideIndex": 1,
    "attr": {
      "class": "title",
      "title": "Title of the Slide",
      "contenteditable": true,
      "id": "slide1ElementTitle",
      "placeholder": "Enter Title here..."
    },
    "style": {
      "fontSize": "48px",
      "minHeight": "80px",
      "paddingTop": "10px",
      "paddingRight": "10px",
      "paddingBottom": "10px",
      "paddingLeft": "10px"
    },
    "innerHTML": "Slide 1 Title fsadfasdf"
  },
  "elem1": {
    "elemId": 1,
    "slideIndex": 1,
    "style": {
      "position": "absolute",
      "top": "10px",
      "minHeight": "30px",
      "height": "70px",
      "width": "95%",
      "maxWidth": "100%"
    },
    "innerHTML": "jh fdosahf hasdfhjiosd f"
  },
  "elem2": {
    "elemId": 2,
    "slideIndex": 1,
    "style": {
      "position": "absolute",
      "top": "90px",
      "minHeight": "30px",
      "height": "70px",
      "width": "95%",
      "fontFamily": "Montserrat, sans-serif",
      "textAlign": "center",
      "backgroundColor": "rgb(64, 0, 64)",
      "color": "rgb(250, 250, 250)"
    },
    "innerHTML": "fasdffsadfs"
  }
}, {
  "elemUserNote": {
    "elemId": "UserNote",
    "slideIndex": 2,
    "attr": {
      "class": "user-note",
      "title": "Note of the Slide",
      "id": "slide2ElementUserNote",
      "contenteditable": true
    },
    "style": {
      "height": "70px",
      "textAlign": "center"
    },
    "innerHTML": "NOTE :fsadfsadfsa"
  },
  "elemTitle": {
    "elemId": "Title",
    "slideIndex": 2,
    "attr": {
      "class": "title",
      "title": "Title of the Slide",
      "contenteditable": true,
      "id": "slide2ElementTitle",
      "placeholder": "Enter Title here..."
    },
    "style": {
      "fontSize": "48px",
      "minHeight": "80px",
      "paddingTop": "10px",
      "paddingRight": "10px",
      "paddingBottom": "10px",
      "paddingLeft": "10px"
    },
    "innerHTML": "Slide 2 Title fsdf"
  },
  "elem1": {
    "elemId": 1,
    "slideIndex": 2,
    "style": {
      "position": "absolute",
      "top": "10px",
      "minHeight": "30px",
      "height": "70px",
      "width": "95%",
      "maxWidth": "100%",
      "textAlign": "right",
      "fontWeight": "bold"
    },
    "innerHTML": "nana"
  },
  "elem2": {
    "elemId": 2,
    "slideIndex": 2,
    "style": {
      "position": "absolute",
      "top": "90px",
      "minHeight": "30px",
      "height": "70px",
      "width": "95%",
      "textAlign": "center"
    },
    "innerHTML": "fsadfsdafdsafasdfsafsdafdsafsaf"
  }
}]
