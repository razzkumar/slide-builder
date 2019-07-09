window.addEventListener("click", ({
  target
}) => {
  let dropdownElem = document.querySelector(".show");
  if (!target.classList.contains("btn") && dropdownElem) {
    dropdownElem.classList.remove("show");
  }
})

// Global events that delete selected 
window.addEventListener("keydown", e => {
  if (e.key === "Delete" && e.ctrlKey) {
    let activeElem = document.querySelector("[datatoolbaractive = 'true']").parentElement;
    activeElem.parentNode.removeChild(activeElem);
  }
}, false);
