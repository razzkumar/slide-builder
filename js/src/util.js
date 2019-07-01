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

  element.addEventListener("mousedown", (event) => {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    styleElement(element, {
      position: "absolute",
      zIndex: 10,
      width: parentElem.clientWidth - GAP_BETWEEN_ELEMENT + "px",
    })

    moveAt(event.pageX, event.pageY);

    // centers the element at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
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
