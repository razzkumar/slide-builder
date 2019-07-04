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

const createElementAndAppend = ({
  parentElem,
  elemType = "div",
  attr,
  innerText,
  innerHTML,
  style
}) => {
  let elem = document.createElement(elemType);
  style && styleElement(elem, style);
  attr && addAttributes(elem, attr);

  if (innerHTML) {
    elem.innerHTML = innerHTML;
  } else if (innerText) {
    elem.innerText = innerText;
  }

  parentElem.appendChild(elem);
  return elem;
}

const dragAndDropElement = (element, parentElem) => {

  let parentX = parentElem.getBoundingClientRect().left;
  let parentY = parentElem.getBoundingClientRect().top;
  let shiftX = 0;
  let shiftY = 0;

  let dragger = element.querySelector(".dragger");

  dragger.addEventListener("mousedown", (event) => {
    event.preventDefault();

    shiftX = event.clientX - element.getBoundingClientRect().left;
    shiftY = event.clientY - element.getBoundingClientRect().top;

    moveAt(event.clientX, event.clientY);

    // move the element on mousemove
    parentElem.addEventListener('mousemove', onMouseMove);
    // drop the element, remove unneeded handlers
    dragger.onmouseup = function () {
      dragger.style.cursor = "grab";
      dragger.style.cursor = "-moz-grabb";
      dragger.style.cursor = "-webkit-grabb";

      parentElem.removeEventListener('mousemove', onMouseMove);
      dragger.onmouseup = null;
    };

  });

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function moveAt(pageX, pageY) {
    dragger.style.cursor = "grabbing";
    dragger.style.cursor = "-moz-grabbing";
    dragger.style.cursor = "-webkit-grabbing";
    element.style.left = pageX - shiftX - parentX + 'px';
    element.style.top = pageY - shiftY - parentY + 'px';
  }

  //preventing default drag and drop
  dragger.addEventListener("dragstart", () => false);
}

const makeResizableDiv = (element) => {
  // const element = document.querySelector(div);
  const resizer = element.querySelector('.resizer');

  let original_width = 0;
  let original_height = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;

  resizer && resizer.addEventListener('mousedown', function (e) {
    e.preventDefault();
    original_width = element.getBoundingClientRect().width;
    original_height = element.getBoundingClientRect().height;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  })

  function resize(e) {
    const width = original_width + (e.pageX - original_mouse_x);
    const height = original_height + (e.pageY - original_mouse_y);
    element.style.width = width + 'px'
    element.style.height = height + 'px'
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize)
  }
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

// Global events

window.addEventListener("keydown", e => {
  if (e.key === "Delete") {
    let activeElem = document.querySelector("[datatoolbaractive = 'true']").parentElement;
    activeElem.parentNode.removeChild(activeElem);
  }
}, false)
