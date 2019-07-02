const styleElement = (elem, style) => {
  let styleKey = style && Object.keys(style);
  if (styleKey && styleKey.length) {
    styleKey.forEach(function (key) {
      elem.style[key] = style[key];
    })
  }
}

const addAttributes = (elem, attrs) => {
  let attrKeys = attrs && Object.keys(attrs);
  if (attrKeys && attrKeys.length) {
    attrKeys.forEach(key => {
      elem.setAttribute(key, attrs[key]);
    })
  }
}

const createElementAndAppend = (parentElem, elemType = "div", attr, innerText, style) => {
  let elem = document.createElement(elemType);
  style && styleElement(elem, style);
  attr && addAttributes(elem, attr);

  if (innerText && innerText.includes("</")) {
    elem.innerHTML = innerText;
  } else if (innerText) {
    elem.innerText = innerText;
  }

  parentElem.appendChild(elem);
  return elem;
}

const dragAndDropElement = (element, parentElem) => {

  let parentX = parentElem.getBoundingClientRect().left;
  let parentY = parentElem.getBoundingClientRect().top;

  element.addEventListener("mousedown", (event) => {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;



    moveAt(event.clientX, event.clientY);

    function moveAt(pageX, pageY) {

      element.style.left = pageX - shiftX - parentX + 'px';
      element.style.top = pageY - shiftY - parentY + 'px';

    }

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    // move the element on mousemove
    parentElem.addEventListener('mousemove', onMouseMove);
    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
      parentElem.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };

  });

  //preventing default drag and drop
  element.addEventListener("dragstart", () => false);
}

// toolbar element property 
const toolbarActionsProperty = [{
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      title: "Text Align Left",
      class: "fa fa-align-left",
      dataCmd: "left",
      cssProperty: "textAlign"
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      title: "Text Align Center",
      class: "fa fa-align-center",
      dataCmd: "center",
      cssProperty: "textAlign"
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      title: "Text Align Right",
      class: "fa fa-align-right",
      dataCmd: "right",
      cssProperty: "textAlign"
    }
  },
  {
    parentElem: "liOfTextAllign",
    elem: "i",
    attr: {
      title: "Text Align Justify",
      class: "fa fa-align-justify",
      dataCmd: "justify",
      cssProperty: "textAlign"
    }
  },

  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      class: "fa fa-bold",
      dataCmd: "bold",
      cssProperty: "fontWeight"
    }
  },
  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      class: "fa fa-italic",
      dataCmd: "italic",
      cssProperty: "fontStyle"
    }
  },
  {
    parentElem: "liOfTextFormat",
    elem: "i",
    attr: {
      class: "fa fa-underline",
      dataCmd: "underline",
      cssProperty: "textDecoration"
    }
  }
]

const formatStyleToStore = (style) => {
  let styleSheet = {}
  let i = 0;
  while (i >= 0) {
    if (style[i]) {
      let key = camalize(style[i]);
      styleSheet[key] = style[key]
      // console.log('key:', key, style[key]);
      i++;
    } else {
      i = -1; //exiting from loop
    }
  }
  return styleSheet;
}

const camalize = (str) => {
  return str.replace(/-+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
}
