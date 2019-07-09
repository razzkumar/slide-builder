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
    }
  },
  "elemTitle": {
    "elemId": "Title",
    "slideIndex": 1,
    "attr": {
      "class": "title",
      "title": "Title of the Slide",
      "contenteditable": true,
      "id": "slide1ElementTitle",
      "placeholder": "Enter Title of slide 1 here..."
    },
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
    "innerHTML": "This is the simple Slide Builder"
  },
  "elem1": {
    "style": {
      "fontSize": "22px",
      "position": "absolute",
      "top": "10px",
      "minHeight": "30px",
      "height": "14.8438%",
      "width": "37.5366%",
      "maxWidth": "100%",
      "color": "rgb(255, 255, 255)",
      "backgroundColor": "rgb(72, 180, 239)"
    },
    "elemId": 1,
    "slideIndex": 1,
    "innerHTML": "core js simple slide builder that helps to create presentation slide easlily&nbsp;"
  },
  "elem2": {
    "elemId": 2,
    "slideIndex": 1,
    "style": {
      "fontSize": "22px",
      "position": "absolute",
      "height": "19.9219%",
      "width": "38.3238%",
      "backgroundColor": "rgb(72, 180, 239)",
      "left": "61.1361%",
      "top": "0.976563%"
    },
    "innerHTML": "This is the left side of the presentation"
  },
  "elem3": {
    "elemId": 3,
    "slideIndex": 1,
    "elemType": "img",
    "style": {
      "position": "absolute",
      "height": "82.6172%",
      "width": "68.6295%",
      "left": "23.1775%",
      "top": "16.7969%"
    }
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
      "height": "70px"
    }
  },
  "elemTitle": {
    "elemId": "Title",
    "slideIndex": 2,
    "attr": {
      "class": "title",
      "title": "Title of the Slide",
      "contenteditable": true,
      "id": "slide2ElementTitle",
      "placeholder": "Enter Title of slide 2 here..."
    },
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
    "innerHTML": "This is second slide of the application"
  },
  "elem1": {
    "style": {
      "fontSize": "22px",
      "fontStyle": "italic",
      "fontWeight": "bold",
      "textAlign": "center",
      "position": "absolute",
      "top": "1.95313%",
      "minHeight": "30px",
      "height": "7.42188%",
      "width": "82.6672%",
      "maxWidth": "100%",
      "color": "rgb(255, 255, 255)",
      "backgroundColor": "rgb(72, 180, 239)",
      "left": "7.87161%"
    },
    "elemId": 1,
    "slideIndex": 2,
    "innerHTML": "And this is really easy application to create the presentation on&nbsp;"
  },
  "elem2": {
    "elemId": 2,
    "slideIndex": 2,
    "elemType": "img",
    "style": {
      "position": "absolute",
      "height": "91.2109%",
      "width": "98.5416%",
      "left": "1.04955%",
      "top": "10.1563%"
    }
  },
  "elem3": {
    "elemId": 3,
    "slideIndex": 2,
    "style": {
      "fontSize": "22px",
      "textAlign": "center",
      "position": "absolute",
      "height": "7.22656%",
      "width": "15.4961%",
      "backgroundColor": "rgb(72, 180, 239)",
      "left": "42.944%",
      "top": "93.3594%"
    },
    "innerHTML": "Beautiful Nature"
  }
}]
