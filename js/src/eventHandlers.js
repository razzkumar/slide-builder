window.addEventListener("click", ({
  target
}) => {
  let dropdownElem = document.querySelector(".show");
  if (!target.classList.contains("btn") && dropdownElem) {
    dropdownElem.classList.remove("show");
  }
})

// Global events that delete selected 
let counter = 0;
window.addEventListener("keydown", e => {

  if (e.key === "Delete" && e.ctrlKey) {
    let activeElem = document.querySelector("[datatoolbaractive = 'true']").parentElement;
    activeElem.parentNode.removeChild(activeElem);
  }

  let presentationSideWrapper = document.querySelector(".fullscreen .presentation-slide");

  if (e.key === "ArrowRight" && presentationSideWrapper) {

    let slides = presentationSideWrapper.children;

    if (counter >= slides.length - 1) return;
    counter++;

    let nextSlide = presentationSideWrapper.querySelector(`[dataslideindex='${counter}']`);
    if (nextSlide) {
      presentationSideWrapper.style.transition = "transform 0.4s ease-in-out";
      presentationSideWrapper.style.transform = `translateX(${-100 * counter}vw)`;
    } else {
      console.log("END of slde");
    }
  }

  if (e.key === "ArrowLeft" && presentationSideWrapper) {

    if (counter <= 0) return
    counter--;

    let prevSlide = presentationSideWrapper.querySelector(`[dataslideindex='${counter}']`);
    if (prevSlide) {
      presentationSideWrapper.style.transition = "transform 0.5s ease-in-out";
      presentationSideWrapper.style.transform = `translateX(${-100 * counter}vw)`;
    } else {
      presentationSideWrapper.style.transform = `translateX(0)`;
      console.log("FIRST SLIDE")
    }
  }

}, false);
