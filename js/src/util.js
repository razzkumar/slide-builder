/**
 * A function to style a HTML element 
 * key of object must be valid css property in js representation (eg.background-color to backgroundColor:"red")
 * @param  {HTML element} elem HTML element in which style are applied
 * @param  {Style Object} style Object of styles that applied to HTML element
 * @example
 * styleElement(heading,{backgroundColor:"#AAA"})
 */
const styleElement = (elem, style) => {
  let styleKey = style && Object.keys(style);
  if (styleKey && styleKey.length) {
    styleKey.forEach(function (key) {
      elem.style[key] = style[key];
    })
  }
}


/**
 * A function to append attributes on the  HTML element
 * @param  {*} elem  HTML element in which attributes are applied
 * @param  {*} attrs Object of attributes that applied HTML  element
 * @example
 * addAttributes(heading,{class:"heading-container"})
 */
const addAttributes = (elem, attrs) => {
  let attrKeys = attrs && Object.keys(attrs);
  if (attrKeys && attrKeys.length) {
    attrKeys.forEach(key => {
      elem.setAttribute(key, attrs[key]);
    })
  }
}

/**
 * A function to create HTML element and apply style as well as add the attributes
 * 
 * @param  {*} {parentElem  HTML element in which new HTML element is appended
 * @param  {*} elemType [n="div"] Type of element to create
 * @param  {*} attr attributes of the element 
 * @param  {*} innerText [n] Content of element  
 * @param  {*} innerHTML [n] Content of element
 * @param  {*} style} Style of the element is to be added with valid css property
 */
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
/**
 * A function that helps to change the position of element by draging or resizing 
 * @param  {HTML element} element element in which drag event should fired
 * @example
 * dragAndDropElement(slide1Element1,slideData,"drag");
 */

const updatePosition = (element, type) => {


  if (type === "drag") {

    let parentX = 0;
    let parentY = 0;

    let shiftX = 0;
    let shiftY = 0;

    let dragger = element.querySelector(".dragger");

    dragger.addEventListener("mousedown", (event) => {

      parentX = element.parentElement.getBoundingClientRect().left;
      parentY = element.parentElement.getBoundingClientRect().top;


      event.preventDefault();

      shiftX = event.clientX - element.getBoundingClientRect().left;
      shiftY = event.clientY - element.getBoundingClientRect().top;

      moveAt(event.clientX, event.clientY);

      // move the element on mousemove
      element.parentElement.addEventListener('mousemove', onMouseMove);
      // drop the element, remove unneeded handlers
      dragger.onmouseup = function () {

        let lastFcused = document.querySelector("[dataToolbarActive='true']");
        if (lastFcused) {
          lastFcused.focus();
        }
        dragger.style.cursor = "grab";
        element.parentElement.removeEventListener('mousemove', onMouseMove);
        dragger.onmouseup = null;
      };

    });

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    function moveAt(pageX, pageY) {

      let left = pageX - shiftX - parentX;
      let top = pageY - shiftY - parentY

      // convert to percentage
      let leftPercentage = (left * 100) / element.parentElement.getBoundingClientRect().width + '%'
      let topPercentage = (top * 100) / element.parentElement.getBoundingClientRect().height + '%'

      dragger.style.cursor = "grabbing";
      element.style.left = leftPercentage;
      element.style.top = topPercentage;

      // updating thumbnail
      let id = element.getAttribute("id");

      let thumbnailElem = document.querySelector(`.thumbnail #${id}`);

      if (thumbnailElem) {
        thumbnailElem.style.left = leftPercentage;
        thumbnailElem.style.top = topPercentage;
      }
    }

    //preventing default drag and drop
    dragger.addEventListener("dragstart", () => false);

  } else if (type === "resize") {

    // resize 
    let original_width = 0;
    let original_height = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    const resizer = element.querySelector('.resizer');

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

      let width = original_width + (e.pageX - original_mouse_x);
      let height = original_height + (e.pageY - original_mouse_y);

      // convert to percentage
      let widthPercentage = (width * 100) / element.parentElement.getBoundingClientRect().width + '%'
      let heightPercentage = (height * 100) / element.parentElement.getBoundingClientRect().height + '%'
      element.style.width = widthPercentage;
      element.style.height = heightPercentage;

      // updating thumbnail
      let id = element.getAttribute("id");
      let thumbnailElem = document.querySelector(`.thumbnail #${id}`);

      if (thumbnailElem) {
        thumbnailElem.style.width = widthPercentage
        thumbnailElem.style.height = heightPercentage
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }

  }

}
/**
 * A funtion that takes inline style and convert to js Object style
 * @param  {Object} style style of element (eg. slide1.style)
 * @returns Object that contains js formated style of element
 * @example
 * formatStyleToStore(slide1.style);
 */
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

/** A function to make camel case to any string
 * @param  {String} str String to be camalize
 * @returns {String} camal case string
 */
const camalize = (str) => {
  return str.replace(/[-,\W]+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });
}


/**
 * A function that helps to  export All Collected/prepated data  
 * @param  {Object} jsonData Data is to be exported
 * @param  {String} fileName [n="data.json"] name of the download file 
 */
const exportToJsonFile = (jsonData, fileName) => {
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = fileName || 'data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

/**
 * A function that generate random number between passed range
 * @param  {Number} min Lower value of the range
 * @param  {Number} max Upper value of the range
 * @returns {Number} random number between given number
 */
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * A function that remove the un
 * @param {*} elem 
 */
const removeUnnecessaryAttr = (elem) => {
  let dragger = elem.querySelector(".dragger");
  dragger.parentElement.removeChild(dragger)

  let resizer = elem.querySelector(".resizer");
  resizer.parentElement.removeChild(resizer)
  // removing contenteditable attribute on slide list
  let allContentEditAble = elem.querySelectorAll("[contenteditable='true']");
  allContentEditAble.forEach(el => {
    el.removeAttribute("contenteditable");
  });

}
